// employee-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';

interface Lead {
  id: number;
  customerName: string;
  status: 'pending' | 'success' | 'failed';
  assignedDate: string;
  value: number;
}

interface Attendance {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'halfday';
}

// ==================== NEW ATTENDANCE INTERFACES ====================
interface AttendanceRecord {
  _id: string;
  date: Date;
  checkInTime: Date;
  checkOutTime: Date | null;
  status: string;
  isLate: boolean;
  lateByMinutes: number;
  isEarlyOut: boolean;
  earlyOutByMinutes: number;
  workDuration: number;
  checkInLocation?: {
    address: string;
  };
}

interface MonthlySummary {
  month: number;
  year: number;
  totalPresent: number;
  totalHalfDay: number;
  totalLate: number;
  totalEarlyOut: number;
  totalWorkingDays: number;
  averageWorkHours: string;
}

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
}

interface Lead {
  _id: string;
  leadName: string;
  leadPhone: string;
  submittedDate: string;
  submittedTime: string;
  leadSource: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
  assignTo: {
    _id: string;
    name: string;
    mobile: string;
  };
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {

  userRole: string = '';
  menuItems: MenuItem[] = [];

  constructor(private http: HttpClient, public authService: AuthService) { }

  ngOnInit(): void {
    this.fetchLeads();
    this.loadAttendanceData(); // ⭐ NEW: Load attendance data

    this.userRole = this.authService.getUser()?.role;

    const user = this.authService.getUser();
    this.userRole = user?.role || '';
  }

  employeeName = 'Rajesh Kumar';
  employeeId = 'EMP001';

  leads: Lead[] = [];
  selectedLead: Lead | null = null;
  showDetailsModal: boolean = false;
  filterStatus: string = 'All';
  searchTerm: string = '';
  loading: boolean = false;

  private apiUrl = 'https://api.aadifintech.com/api/lead/list';
  // private apiUrl = 'http://localhost:5000/api/lead/list';
  
  // ==================== NEW: ATTENDANCE API URL ====================
  private attendanceApiUrl = 'https://api.aadifintech.com/api/attendance';
  // private attendanceApiUrl = 'http://localhost:5000/api/attendance';

  // Lead Statistics
  totalLeads = 45;
  successLeads = 28;
  pendingLeads = 12;
  failedLeads = 5;
  successRate = ((this.successLeads / this.totalLeads) * 100).toFixed(1);

  // ==================== NEW: ATTENDANCE DATA PROPERTIES ====================
  attendanceRecords: AttendanceRecord[] = [];
  monthlySummary: MonthlySummary | null = null;
  attendanceLoading = false;
  attendanceError: string | null = null;

  // Month and Year Selection
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  years: number[] = [];

  // Pagination for Attendance
  attendanceCurrentPage = 1;
  attendanceTotalPages = 1;

  // Attendance Statistics - OLD (will be replaced by API data)
  currentMonth = 'DEC 2025';
  totalWorkingDays = 22;
  presentDays = 18;
  absentDays = 2;
  halfDays = 1;
  attendancePercentage = ((this.presentDays / this.totalWorkingDays) * 100).toFixed(1);

  // Pagination for Leads
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Recent Attendance - OLD (will be replaced by API data)
  recentAttendance: Attendance[] = [
    { date: '2024-11-18', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'present' },
    { date: '2024-11-17', checkIn: '09:00 AM', checkOut: '06:15 PM', status: 'present' },
    { date: '2024-11-16', checkIn: '09:30 AM', checkOut: '02:00 PM', status: 'halfday' },
    { date: '2024-11-15', checkIn: '09:10 AM', checkOut: '06:20 PM', status: 'present' },
    { date: '2024-11-14', checkIn: '-', checkOut: '-', status: 'absent' }
  ];

  // ==================== CONSTRUCTOR & INIT ====================
  constructor_init() {
    // Generate last 3 years and next 1 year for dropdown
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 3; i <= currentYear + 1; i++) {
      this.years.push(i);
    }
  }

  // ==================== ATTENDANCE API METHODS ====================

  // Get Authorization Headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Load Monthly Summary from API
  loadMonthlySummary(): void {
    const url = `${this.attendanceApiUrl}/monthly-summary?month=${this.selectedMonth}&year=${this.selectedYear}`;

    this.http.get<any>(url, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.monthlySummary = response.summary;
          this.attendanceRecords = response.attendance || [];

          // Update old variables for compatibility
          this.totalWorkingDays = this.monthlySummary?.totalWorkingDays || 0;
          this.presentDays = this.monthlySummary?.totalPresent || 0;
          this.halfDays = this.monthlySummary?.totalHalfDay || 0;
          this.absentDays = this.totalWorkingDays - this.presentDays - this.halfDays;
          this.attendancePercentage = this.calculateAttendancePercentage().toString();
          this.currentMonth = this.getMonthName(this.selectedMonth).toUpperCase() + ' ' + this.selectedYear;

          console.log('Monthly Summary Loaded:', this.monthlySummary);
          console.log('Attendance Records:', this.attendanceRecords.length);
        }
      },
      error: (err) => {
        console.error('Error loading monthly summary:', err);
        this.attendanceError = 'Failed to load monthly summary';
      }
    });
  }

  // Load Attendance History
  loadAttendanceHistory(): void {
    const url = `${this.attendanceApiUrl}/my-attendance?page=${this.attendanceCurrentPage}&limit=30`;

    this.http.get<any>(url, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        if (response.success) {
          this.attendanceRecords = response.attendance || [];
          this.attendanceTotalPages = response.totalPages || 1;
          console.log('Attendance History Loaded:', this.attendanceRecords.length);
        }
      },
      error: (err) => {
        console.error('Error loading attendance history:', err);
        this.attendanceError = 'Failed to load attendance history';
      }
    });
  }

  // Main Load Function for Attendance
  loadAttendanceData(): void {
    this.attendanceLoading = true;
    this.attendanceError = null;
    this.constructor_init(); // Initialize years array

    // Load monthly summary (which includes attendance records)
    this.loadMonthlySummary();

    setTimeout(() => {
      this.attendanceLoading = false;
    }, 1000);
  }

  // ==================== ATTENDANCE FORMATTING METHODS ====================

  // Format Date
  formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Format Time
  formatTime(time: Date | string | null): string {
    if (!time) return 'Not checked out';
    const t = new Date(time);
    return t.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  // Format Work Duration
  formatWorkDuration(minutes: number): string {
    if (!minutes || minutes === 0) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  // Get Month Name
  getMonthName(monthNum: number): string {
    const month = this.months.find(m => m.value === monthNum);
    return month ? month.label : '';
  }

  // Calculate Attendance Percentage
  calculateAttendancePercentage(): number {
    if (!this.monthlySummary || this.monthlySummary.totalWorkingDays === 0) {
      return 0;
    }
    const total = this.monthlySummary.totalPresent + this.monthlySummary.totalHalfDay;
    return Math.round((total / this.monthlySummary.totalWorkingDays) * 100);
  }

  // Get Absent Days
  getAbsentDays(): number {
    if (!this.monthlySummary) return 0;
    return this.monthlySummary.totalWorkingDays -
           this.monthlySummary.totalPresent -
           this.monthlySummary.totalHalfDay;
  }

  // ==================== ATTENDANCE PAGINATION ====================

  nextAttendancePage(): void {
    if (this.attendanceCurrentPage < this.attendanceTotalPages) {
      this.attendanceCurrentPage++;
      this.loadAttendanceHistory();
    }
  }

  previousAttendancePage(): void {
    if (this.attendanceCurrentPage > 1) {
      this.attendanceCurrentPage--;
      this.loadAttendanceHistory();
    }
  }

  goToAttendancePage(page: number): void {
    if (page >= 1 && page <= this.attendanceTotalPages) {
      this.attendanceCurrentPage = page;
      this.loadAttendanceHistory();
    }
  }

  // ==================== EXISTING METHODS (UNCHANGED) ====================

  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'success': 'status-success',
      'pending': 'status-pending',
      'failed': 'status-failed',
      'present': 'status-success',
      'Present': 'status-success',
      'absent': 'status-failed',
      'Absent': 'status-failed',
      'halfday': 'status-pending',
      'Half-Day': 'status-pending'
    };
    return classes[status] || '';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'success': 'Success',
      'pending': 'Pending',
      'failed': 'Failed',
      'present': 'Present',
      'Present': 'Present',
      'absent': 'Absent',
      'Absent': 'Absent',
      'halfday': 'Half Day',
      'Half-Day': 'Half Day'
    };
    return texts[status] || status;
  }

  getPendingCount(): number {
    if (!Array.isArray(this.leads)) return 0;
    return this.leads.filter(lead => lead.status === 'pending').length;
  }

  getSuccessCount(): number {
    if (!Array.isArray(this.leads)) return 0;
    return this.leads.filter(lead => lead.status === 'success').length;
  }

  getFilteredLeads(): Lead[] {
    if (!Array.isArray(this.leads)) return [];

    let filtered = this.leads;

    if (this.filterStatus !== 'All') {
      filtered = filtered.filter(lead => lead.status === this.filterStatus);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.leadName.toLowerCase().includes(term) ||
        lead.leadPhone.includes(term) ||
        lead.leadSource.toLowerCase().includes(term) ||
        lead.notes.toLowerCase().includes(term) ||
        lead.assignTo.name.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getPaginatedLeads(): Lead[] {
    const filtered = this.getFilteredLeads();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  fetchLeads(): void {
    this.loading = true;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.get<any>(this.apiUrl, { headers }).subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response.success && Array.isArray(response.leads)) {
          this.leads = response.leads.map((lead: any) => ({
            ...lead,
            _id: String(lead._id?.$oid || lead._id),
            status: lead.status || 'pending'
          }));

          console.log('Leads loaded:', this.leads.length);
          console.log('First lead ID:', this.leads[0]?._id, '| Type:', typeof this.leads[0]?._id);
        } else {
          this.leads = [];
          console.warn('Unexpected API response format');
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching leads:', error);
        this.leads = [];
        this.loading = false;
      }
    });
  }

}