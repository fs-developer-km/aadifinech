// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-attendance-details',
//   imports: [],
//   templateUrl: './attendance-details.component.html',
//   styleUrl: './attendance-details.component.css'
// })
// export class AttendanceDetailsComponent {

// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Employee {
  _id: string;
  name: string;
  mobile: string;
  employeeCode: string;
  employeeId?: Employee | null;
}

interface Attendance {
  _id: string;
  employeeId: Employee;
  employeeName: string;
  employeeCode: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  workDuration: number;
  status: string;
  isLate: boolean;
  lateByMinutes: number;
  isEarlyOut: boolean;
  earlyOutByMinutes: number;
}

interface LeaveRequest {
  _id: string;
  employeeId: Employee;
  employeeName: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  reason: string;
  status: string;
  createdAt: string;
  rejectionReason?: string;
}

@Component({
  selector: 'app-admin-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.css'
})
export class AttendanceDetailsComponent implements OnInit {
  private apiUrl = 'https://api.aadifintech.com/api/attendance/admin';
  // private apiUrl = 'https://aadifintech-backend.onrender.com/api/attendance/admin';
  // private apiUrl = 'http://localhost:5000/api/attendance/admin';
  
  // Current state
  activeTab = 'today'; // today, reports, leaves, manual, statistics
  isLoading = false;
  currentTime = new Date();
  
  // Today's Attendance
  todayPresent: Attendance[] = [];
  todayAbsent: Employee[] = [];
  todayStats = { totalEmployees: 0, present: 0, absent: 0 };
  
  // Employee Reports
  employees: Employee[] = [];
  selectedEmployeeId = '';
  employeeAttendance: Attendance[] = [];
  reportStartDate = '';
  reportEndDate = '';
  reportPage = 1;
  reportTotalPages = 1;
  
  // Monthly Report
  monthlyReport: any[] = [];
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  
  // Leave Management
  leaveRequests: LeaveRequest[] = [];
  leaveFilter = 'all'; // all, Pending, Approved, Rejected
  selectedLeave: LeaveRequest | null = null;
  showLeaveModal = false;
  leaveAction = { status: '', rejectionReason: '' };
  
  // Manual Entry
  manualEntry = {
    employeeId: '',
    date: '',
    checkInTime: '',
    checkOutTime: '',
    status: 'Present',
    remarks: ''
  };
  showManualModal = false;
  
  // Statistics
  statistics: any = null;
  statsMonth = new Date().getMonth() + 1;
  statsYear = new Date().getFullYear();
  
  // Loading and messages
  isSubmitting = false;
  showSuccessModal = false;
  successMessage = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodayAttendance();
    this.loadAllEmployees();
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
            this.todayPresent = response.present;
            this.todayAbsent = response.absent;
            this.todayStats = response.stats;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading today attendance:', error);
          this.isLoading = false;
        }
      });
  }

  // ==================== EMPLOYEE REPORTS ====================
  
  loadAllEmployees() {
    // Load employees from user API or use existing
    // For now, we'll get unique employees from attendance
    this.http.get<any>(`${this.apiUrl}/date-range`, {
      ...this.getHeaders(),
      params: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
      }
    }).subscribe({
      next: (response) => {
        if (response.success) {
          const uniqueEmployees = new Map();
          response.attendance.forEach((record: Attendance) => {
            if (record.employeeId && !uniqueEmployees.has(record.employeeId._id)) {
              uniqueEmployees.set(record.employeeId._id, record.employeeId);
            }
          });
          this.employees = Array.from(uniqueEmployees.values());
        }
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  loadEmployeeReport() {
    if (!this.selectedEmployeeId) {
      alert('Please select an employee');
      return;
    }

    this.isLoading = true;
    const params: any = {
      page: this.reportPage,
      limit: 10
    };

    if (this.reportStartDate) params.startDate = this.reportStartDate;
    if (this.reportEndDate) params.endDate = this.reportEndDate;

    this.http.get<any>(`${this.apiUrl}/employee/${this.selectedEmployeeId}`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.employeeAttendance = response.attendance;
          this.reportTotalPages = response.totalPages;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading employee report:', error);
        this.isLoading = false;
      }
    });
  }

  previousReportPage() {
    if (this.reportPage > 1) {
      this.reportPage--;
      this.loadEmployeeReport();
    }
  }

  nextReportPage() {
    if (this.reportPage < this.reportTotalPages) {
      this.reportPage++;
      this.loadEmployeeReport();
    }
  }

  // ==================== MONTHLY REPORT ====================
  
  loadMonthlyReport() {
    this.isLoading = true;
    const params = {
      month: this.selectedMonth.toString(),
      year: this.selectedYear.toString()
    };

    this.http.get<any>(`${this.apiUrl}/monthly-report`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.monthlyReport = response.report;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading monthly report:', error);
        this.isLoading = false;
      }
    });
  }

  changeReportMonth(delta: number) {
    this.selectedMonth += delta;
    if (this.selectedMonth > 12) {
      this.selectedMonth = 1;
      this.selectedYear++;
    } else if (this.selectedMonth < 1) {
      this.selectedMonth = 12;
      this.selectedYear--;
    }
    this.loadMonthlyReport();
  }

  // ==================== LEAVE MANAGEMENT ====================
  
  loadLeaveRequests() {
    this.isLoading = true;
    const params: any = {};
    if (this.leaveFilter !== 'all') {
      params.status = this.leaveFilter;
    }

    this.http.get<any>(`${this.apiUrl}/leave-requests`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.leaveRequests = response.leaveRequests;
          console.log("this is a leave request ",this.leaveRequests);
          
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading leave requests:', error);
        this.isLoading = false;
      }
    });
  }

  filterLeaves(filter: string) {
    this.leaveFilter = filter;
    this.loadLeaveRequests();
  }

  openLeaveApproval(leave: LeaveRequest) {
    this.selectedLeave = leave;
    this.leaveAction = { status: '', rejectionReason: '' };
    this.showLeaveModal = true;
  }

  closeLeaveModal() {
    this.showLeaveModal = false;
    this.selectedLeave = null;
  }

  approveLeave() {
    if (!this.selectedLeave) return;

    this.isSubmitting = true;
    const payload = { status: 'Approved' };

    this.http.put<any>(
      `${this.apiUrl}/leave/${this.selectedLeave._id}`,
      payload,
      this.getHeaders()
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess('Leave request approved successfully!');
          this.closeLeaveModal();
          this.loadLeaveRequests();
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to approve leave');
        this.isSubmitting = false;
      }
    });
  }

  rejectLeave() {
    if (!this.selectedLeave || !this.leaveAction.rejectionReason) {
      alert('Please provide rejection reason');
      return;
    }

    this.isSubmitting = true;
    const payload = {
      status: 'Rejected',
      rejectionReason: this.leaveAction.rejectionReason
    };

    this.http.put<any>(
      `${this.apiUrl}/leave/${this.selectedLeave._id}`,
      payload,
      this.getHeaders()
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess('Leave request rejected!');
          this.closeLeaveModal();
          this.loadLeaveRequests();
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        alert(error.error?.message || 'Failed to reject leave');
        this.isSubmitting = false;
      }
    });
  }

  // ==================== MANUAL ENTRY ====================
  
  openManualEntry() {
    this.manualEntry = {
      employeeId: '',
      date: '',
      checkInTime: '',
      checkOutTime: '',
      status: 'Present',
      remarks: ''
    };
    this.showManualModal = true;
  }

  closeManualModal() {
    this.showManualModal = false;
  }

  submitManualEntry() {
    if (!this.manualEntry.employeeId || !this.manualEntry.date || 
        !this.manualEntry.checkInTime) {
      alert('Please fill required fields');
      return;
    }

    this.isSubmitting = true;
    this.http.post<any>(`${this.apiUrl}/manual-entry`, this.manualEntry, this.getHeaders())
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.showSuccess('Manual attendance entry created successfully!');
            this.closeManualModal();
            this.loadTodayAttendance();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          alert(error.error?.message || 'Failed to create manual entry');
          this.isSubmitting = false;
        }
      });
  }

  // ==================== STATISTICS ====================
  
  loadStatistics() {
    this.isLoading = true;
    const params = {
      month: this.statsMonth.toString(),
      year: this.statsYear.toString()
    };

    this.http.get<any>(`${this.apiUrl}/statistics`, {
      ...this.getHeaders(),
      params
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.statistics = response.statistics;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.isLoading = false;
      }
    });
  }

  changeStatsMonth(delta: number) {
    this.statsMonth += delta;
    if (this.statsMonth > 12) {
      this.statsMonth = 1;
      this.statsYear++;
    } else if (this.statsMonth < 1) {
      this.statsMonth = 12;
      this.statsYear--;
    }
    this.loadStatistics();
  }

  // ==================== HELPER FUNCTIONS ====================
  
  showSuccess(message: string) {
    this.successMessage = message;
    this.showSuccessModal = true;
    setTimeout(() => {
      this.showSuccessModal = false;
    }, 3000);
  }

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
    
    if (tab === 'today') {
      this.loadTodayAttendance();
    } else if (tab === 'reports' && this.monthlyReport.length === 0) {
      this.loadMonthlyReport();
    } else if (tab === 'leaves' && this.leaveRequests.length === 0) {
      this.loadLeaveRequests();
    } else if (tab === 'statistics' && !this.statistics) {
      this.loadStatistics();
    }
  }
}