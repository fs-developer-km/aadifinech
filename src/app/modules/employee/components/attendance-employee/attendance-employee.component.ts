// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-attendance-employee',
//   imports: [],
//   templateUrl: './attendance-employee.component.html',
//   styleUrl: './attendance-employee.component.css'
// })
// export class AttendanceEmployeeComponent {

// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Attendance {
  _id: string;
  date: string;
  checkInTime: string;
  // checkOutTime?: string;
    checkOutTime: string;

  checkInLocation: {
    latitude: number;
    longitude: number;
    address: string;
  };
  checkOutLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  workDuration: number;
  status: string;
  isLate: boolean;
  lateByMinutes: number;
  isEarlyOut: boolean;
  earlyOutByMinutes: number;
}

interface LeaveRequest {
  _id: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  reason: string;
  status: string;
  createdAt: string;
}

@Component({
  selector: 'app-attendance-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './attendance-employee.component.html',
  styleUrl: './attendance-employee.component.css'
})
export class AttendanceEmployeeComponent implements OnInit{
  private apiUrl = 'https://api.aadifintech.com/api/attendance';
  // private apiUrl = 'http://localhost:5000/api/attendance';
  
  // Current state
  todayAttendance: Attendance | null = null;
  hasCheckedIn = false;
  hasCheckedOut = false;
  isLoading = false;
  currentTime = new Date();
  
  // Location data
  currentLocation = { latitude: 0, longitude: 0, address: '' };
  isGettingLocation = false;
  
  // Tabs
  activeTab = 'today'; // today, history, monthly, leave
  
  // History data
  attendanceHistory: Attendance[] = [];
  historyPage = 1;
  historyTotalPages = 1;
  historyStartDate = '';
  historyEndDate = '';
  
  // Monthly summary
  monthlySummary: any = null;
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  monthlyAttendance: Attendance[] = [];
  
  // Leave requests
  leaveRequests: LeaveRequest[] = [];
  newLeaveRequest = {
    leaveType: 'Sick Leave',
    fromDate: '',
    toDate: '',
    reason: ''
  };
  showLeaveModal = false;
  
  // Stats
  stats = {
    totalPresent: 0,
    totalLate: 0,
    avgWorkHours: 0
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodayAttendance();
    this.loadAttendanceHistory();
    this.loadLeaveRequests();
    this.updateTime();
  }

  updateTime() {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken()}`
      }
    };
  }

  // ==================== TODAY'S ATTENDANCE ====================
  
  loadTodayAttendance() {
    this.isLoading = true;
    this.http.get<any>(`${this.apiUrl}/today`, this.getHeaders())
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.todayAttendance = response.attendance;
            this.hasCheckedIn = response.hasCheckedIn;
            this.hasCheckedOut = response.hasCheckedOut;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading today attendance:', error);
          this.isLoading = false;
        }
      });
  }

  // Get current location
  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocation not supported');
        return;
      }

      this.isGettingLocation = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: 'Office Location'
          };
          this.isGettingLocation = false;
          resolve(this.currentLocation);
        },
        (error) => {
          this.isGettingLocation = false;
          reject(error);
        }
      );
    });
  }

  async checkIn() {
    try {
      await this.getCurrentLocation();
      
      this.isLoading = true;
      const payload = {
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude,
        address: this.currentLocation.address,
        deviceInfo: navigator.userAgent
      };

      this.http.post<any>(`${this.apiUrl}/check-in`, payload, this.getHeaders())
        .subscribe({
          next: (response) => {
            if (response.success) {
              // alert('Check-in successful!');
              this.loadTodayAttendance();
            }
            this.isLoading = false;
          },
          error: (error) => {
            alert(error.error?.message || 'Check-in failed');
            this.isLoading = false;
          }
        });
    } catch (error) {
      alert('Unable to get location. Please enable location services.');
      this.isLoading = false;
    }
  }

  async checkOut() {
    try {
      await this.getCurrentLocation();
      
      this.isLoading = true;
      const payload = {
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude,
        address: this.currentLocation.address
      };

      this.http.post<any>(`${this.apiUrl}/check-out`, payload, this.getHeaders())
        .subscribe({
          next: (response) => {
            if (response.success) {
              // alert('Check-out successful!');
              this.loadTodayAttendance();
            }
            this.isLoading = false;
          },
          error: (error) => {
            alert(error.error?.message || 'Check-out failed');
            this.isLoading = false;
          }
        });
    } catch (error) {
      alert('Unable to get location. Please enable location services.');
      this.isLoading = false;
    }
  }

  // ==================== ATTENDANCE HISTORY ====================
  
  loadAttendanceHistory() {
    const params: any = {
      page: this.historyPage,
      limit: 10
    };

    if (this.historyStartDate) params.startDate = this.historyStartDate;
    if (this.historyEndDate) params.endDate = this.historyEndDate;

    this.http.get<any>(`${this.apiUrl}/my-attendance`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.attendanceHistory = response.attendance;
          this.historyTotalPages = response.totalPages;
        }
      },
      error: (error) => {
        console.error('Error loading history:', error);
      }
    });
  }

  filterHistory() {
    this.historyPage = 1;
    this.loadAttendanceHistory();
  }

  previousPage() {
    if (this.historyPage > 1) {
      this.historyPage--;
      this.loadAttendanceHistory();
    }
  }

  nextPage() {
    if (this.historyPage < this.historyTotalPages) {
      this.historyPage++;
      this.loadAttendanceHistory();
    }
  }

  // ==================== MONTHLY SUMMARY ====================
  
  loadMonthlySummary() {
    const params = {
      month: this.selectedMonth.toString(),
      year: this.selectedYear.toString()
    };

    this.http.get<any>(`${this.apiUrl}/monthly-summary`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.monthlySummary = response.summary;
          this.monthlyAttendance = response.attendance;
        }
      },
      error: (error) => {
        console.error('Error loading monthly summary:', error);
      }
    });
  }

  changeMonth(delta: number) {
    this.selectedMonth += delta;
    if (this.selectedMonth > 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else if (this.selectedMonth < 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    }
    this.loadMonthlySummary();
  }

  // ==================== LEAVE REQUESTS ====================
  
  loadLeaveRequests() {
    this.http.get<any>(`${this.apiUrl}/my-leave-requests`, this.getHeaders())
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.leaveRequests = response.leaveRequests;
          }
        },
        error: (error) => {
          console.error('Error loading leave requests:', error);
        }
      });
  }

  openLeaveModal() {
    this.showLeaveModal = true;
    this.newLeaveRequest = {
      leaveType: 'Sick Leave',
      fromDate: '',
      toDate: '',
      reason: ''
    };
  }

  closeLeaveModal() {
    this.showLeaveModal = false;
  }

  submitLeaveRequest() {
    if (!this.newLeaveRequest.fromDate || !this.newLeaveRequest.toDate || !this.newLeaveRequest.reason) {
      alert('Please fill all fields');
      return;
    }

    this.http.post<any>(`${this.apiUrl}/leave-request`, this.newLeaveRequest, this.getHeaders())
      .subscribe({
        next: (response) => {
          if (response.success) {
            alert('Leave request submitted successfully!');
            this.closeLeaveModal();
            this.loadLeaveRequests();
          }
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to submit leave request');
        }
      });
  }

  // ==================== HELPER FUNCTIONS ====================
  
  formatTime(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  getStatusClass(status: string): string {
    const classes: any = {
      'Present': 'status-present',
      'Half-Day': 'status-halfday',
      'Absent': 'status-absent',
      'Leave': 'status-leave'
    };
    return classes[status] || 'status-present';
  }

  getLeaveStatusClass(status: string): string {
    const classes: any = {
      'Pending': 'leave-pending',
      'Approved': 'leave-approved',
      'Rejected': 'leave-rejected'
    };
    return classes[status] || 'leave-pending';
  }

  getMonthName(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1];
  }

  switchTab(tab: string) {
    this.activeTab = tab;
    
    if (tab === 'history' && this.attendanceHistory.length === 0) {
      this.loadAttendanceHistory();
    } else if (tab === 'monthly' && !this.monthlySummary) {
      this.loadMonthlySummary();
    } else if (tab === 'leave' && this.leaveRequests.length === 0) {
      this.loadLeaveRequests();
    }
  }
}