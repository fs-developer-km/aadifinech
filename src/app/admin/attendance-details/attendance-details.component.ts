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
import * as XLSX from 'xlsx-js-style';

interface EmployeeMonthlyGrid {
  employeeId: string;
  name: string;
  code: string;
  days: { [day: number]: string };
  totalPresent: number;
  totalAbsent: number;
  totalHalfDay: number;
  totalLeave: number;
  totalWorkHours: number;
}

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
  // private apiUrl = 'https://api.aadifintech.com/api/attendance/admin';
  
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

  // Monthly Sheet (Grid)
  gridMonth = new Date().getMonth() + 1;
  gridYear = new Date().getFullYear();
  gridEmployeeFilter = '';
  gridDaysArray: number[] = [];
  gridDaysInMonth = 0;
  monthlyGridData: EmployeeMonthlyGrid[] = [];
  isGridLoading = false;
  
  // Loading and messages
  isSubmitting = false;
  showSuccessModal = false;
  successMessage = '';

  monthlyReportEmployeeId = ''; // ✅ specific employee filter ke liye
monthlyReportSummary: any = null; // ✅ totalEmployees, workingDays etc

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
          console.log('Employees loaded:', this.employees); 
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
  const params: any = {
    month: this.selectedMonth.toString(),
    year: this.selectedYear.toString()
  };

  if (this.monthlyReportEmployeeId) {
    params.employeeId = this.monthlyReportEmployeeId;
  }

  this.http.get<any>(`${this.apiUrl}/monthly-report`, {
    ...this.getHeaders(),
    params
  }).subscribe({
    next: (response) => {
      if (response.success) {
        this.monthlyReport = response.report;
        this.monthlyReportSummary = {
          workingDays: response.workingDays,
          totalEmployees: response.totalEmployees
        };
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error loading monthly report:', error);
      this.isLoading = false;
    }
  });
}

onMonthlyEmployeeFilterChange(): void {
  this.loadMonthlyReport();
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

  // ==================== MONTHLY SHEET (GRID) ====================

  get filteredGridData(): EmployeeMonthlyGrid[] {
    if (!this.gridEmployeeFilter) return this.monthlyGridData;
    return this.monthlyGridData.filter(e => e.employeeId === this.gridEmployeeFilter);
  }

  loadMonthlyGrid() {
    this.isGridLoading = true;

    const startDate = new Date(this.gridYear, this.gridMonth - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(this.gridYear, this.gridMonth, 0).toISOString().split('T')[0];
    this.gridDaysInMonth = new Date(this.gridYear, this.gridMonth, 0).getDate();
    this.gridDaysArray = Array.from({ length: this.gridDaysInMonth }, (_, i) => i + 1);

    this.http.get<any>(`${this.apiUrl}/date-range`, {
      ...this.getHeaders(),
      params: { startDate, endDate }
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.buildMonthlyGrid(response.attendance);
        }
        this.isGridLoading = false;
      },
      error: (error) => {
        console.error('Error loading monthly grid:', error);
        this.isGridLoading = false;
      }
    });
  }

  private buildMonthlyGrid(records: Attendance[]) {
    const gridMap = new Map<string, EmployeeMonthlyGrid>();

    // Sabhi known employees ko pehle se seed karo (zero-attendance wale bhi dikhein)
 this.employees.forEach(emp => {
      gridMap.set(emp._id, {
        employeeId: emp._id,
        name: emp.name || 'Unknown',
        code: emp.employeeCode || '-',
        days: {},
        totalPresent: 0,
        totalAbsent: 0,
        totalHalfDay: 0,
        totalLeave: 0,
        totalWorkHours: 0
      });
    });

    records.forEach(record => {
      const empId = record.employeeId?._id;
      if (!empId) return;

     if (!gridMap.has(empId)) {
        gridMap.set(empId, {
          employeeId: empId,
          name: record.employeeName || record.employeeId?.name || 'Unknown',
          code: record.employeeCode || record.employeeId?.employeeCode || '-',
          days: {},
          totalPresent: 0,
          totalAbsent: 0,
          totalHalfDay: 0,
          totalLeave: 0,
          totalWorkHours: 0
        });
      }

      const entry = gridMap.get(empId)!;
      const day = new Date(record.date).getDate();

      let code = 'P';
      if (record.status === 'Half-Day') code = 'H';
      else if (record.status === 'Leave') code = 'L';

      entry.days[day] = code;

      if (code === 'P') entry.totalPresent++;
      else if (code === 'H') entry.totalHalfDay++;
      else if (code === 'L') entry.totalLeave++;

      entry.totalWorkHours += (record.workDuration || 0) / 60;
    });

    // Jin dino ka record nahi mila (aur date future nahi hai), unhe Absent maano
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === this.gridYear && (today.getMonth() + 1) === this.gridMonth;
    const lastDayToMark = isCurrentMonth ? today.getDate() : this.gridDaysInMonth;

    gridMap.forEach(entry => {
      for (let d = 1; d <= lastDayToMark; d++) {
        if (!entry.days[d]) {
          entry.days[d] = 'A';
          entry.totalAbsent++;
        }
      }
    });

    this.monthlyGridData = Array.from(gridMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }

  changeGridMonth(delta: number) {
    this.gridMonth += delta;
    if (this.gridMonth > 12) {
      this.gridMonth = 1;
      this.gridYear++;
    } else if (this.gridMonth < 1) {
      this.gridMonth = 12;
      this.gridYear--;
    }
    this.loadMonthlyGrid();
  }

  getGridCellClass(code: string): string {
    const classes: any = { P: 'present', A: 'absent', H: 'halfday', L: 'leave' };
    return classes[code] || '';
  }

exportGridToExcel() {
    const data = this.filteredGridData;
    if (data.length === 0) return;

    const dayHeaders = this.gridDaysArray.map(d => `Day ${d}`);
    const headers = ['Employee Name', 'Employee Code', ...dayHeaders, 'Present', 'Absent', 'Half Day', 'Leave', 'Total Hours'];

    const aoa: any[][] = [headers];

    data.forEach(emp => {
      const row: any[] = [emp.name || '-', emp.code || '-'];
      this.gridDaysArray.forEach(day => row.push(emp.days[day] || '-'));
      row.push(
        emp.totalPresent,
        emp.totalAbsent,
        emp.totalHalfDay,
        emp.totalLeave,
        Number(emp.totalWorkHours.toFixed(1))
      );
      aoa.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(aoa);
    const dayColCount = this.gridDaysArray.length;
    const totalCols = 2 + dayColCount + 5;

    const thinBorder = {
      top: { style: 'thin', color: { rgb: 'E5E7EB' } },
      bottom: { style: 'thin', color: { rgb: 'E5E7EB' } },
      left: { style: 'thin', color: { rgb: 'E5E7EB' } },
      right: { style: 'thin', color: { rgb: 'E5E7EB' } }
    };

    // Header row style
    for (let c = 0; c < totalCols; c++) {
      const ref = XLSX.utils.encode_cell({ r: 0, c });
      if (worksheet[ref]) {
        worksheet[ref].s = {
          font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
          fill: { fgColor: { rgb: 'DD3333' } },
          alignment: { horizontal: 'center', vertical: 'center' },
          border: thinBorder
        };
      }
    }

    const dayColors: any = { P: 'DCFCE7', A: 'FDEAEA', H: 'FFF3D6', L: 'DBEAFE', '-': 'F3F4F6' };
    const dayFontColors: any = { P: '15803D', A: 'DD3333', H: 'C2760A', L: '1D4ED8', '-': '9CA3AF' };

    for (let r = 1; r <= data.length; r++) {
      for (let c = 0; c < totalCols; c++) {
        const ref = XLSX.utils.encode_cell({ r, c });
        const cell = worksheet[ref];
        if (!cell) continue;

        if (c === 0) {
          cell.s = {
            font: { bold: true, sz: 10 },
            alignment: { horizontal: 'left', vertical: 'center' },
            border: thinBorder
          };
        } else if (c === 1) {
          cell.s = {
            font: { sz: 10, color: { rgb: '6B7280' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: thinBorder
          };
        } else if (c >= 2 && c < 2 + dayColCount) {
          const val = String(cell.v);
          cell.s = {
            font: { bold: true, sz: 9, color: { rgb: dayFontColors[val] || '374151' } },
            fill: { fgColor: { rgb: dayColors[val] || 'FFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: thinBorder
          };
        } else {
          cell.s = {
            font: { bold: true, sz: 10 },
            alignment: { horizontal: 'center', vertical: 'center' },
            border: thinBorder
          };
        }
      }
    }

    worksheet['!cols'] = [
      { wch: 22 }, { wch: 14 },
      ...this.gridDaysArray.map(() => ({ wch: 5 })),
      { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 9 }, { wch: 11 }
    ];
    worksheet['!rows'] = [{ hpt: 24 }];

    const workbook = XLSX.utils.book_new();
    const monthLabel = `${this.getMonthName(this.gridMonth)}_${this.gridYear}`;
    // XLSX.utils.book_append_sheet(workbook, worksheet, `Attendance ${monthLabel}`.substring(0, 31));
    // XLSX.writeFile(workbook, `Attendance_Report_${monthLabel}.xlsx`);


       // Iski jagah ye karo:
    XLSX.utils.book_append_sheet(workbook, worksheet, `Attendance ${monthLabel}`.substring(0, 31));

const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Attendance_Report_${monthLabel}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }


}