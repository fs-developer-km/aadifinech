import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface EmployeeLead {
  _id: string;
  customerName: string;
  customerMobile: string;
  customerEmail?: string;
  loanType: string;
  loanAmount: number;
  monthlyIncome?: number;
  employmentType?: string;
  status: string;
  subStatus?: string;
  priority: string;
  submittedBy?: {
    name: string;
    companyName?: string;
    mobile: string;
  };
  assignedEmployee?: any;
  assignedManager?: any;
  partnerName: string;
  submittedDate: string;
  submittedTime: string;
  createdAt: string;
  remarks?: any[];
  statusHistory?: any[];
  nextFollowUpDate?: string;
  bankName?: string;
  applicationNumber?: string;
  sanctionedAmount?: number;
  interestRate?: number;
  tenure?: number;
}

interface DashboardStats {
  byStatus: any;
  byPriority: any;
  todayFollowups: number;
  overdueTasks: number;
}

@Component({
  selector: 'app-employee-dashboard-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-dashboard-component.component.html',
  styleUrl: './employee-dashboard-component.component.css'
})
export class EmployeeDashboardComponentComponent implements OnInit {

  private apiUrl = 'https://api.aadifintech.com/api/partnerLead';
  private token = localStorage.getItem('token') || '';

  leads: EmployeeLead[] = [];
  selectedLead: EmployeeLead | null = null;
  dashboardStats: DashboardStats | null = null;

  currentPage = 1;
  limit = 10;
  totalPages = 1;
  totalLeads = 0;

  statusFilter = '';
  priorityFilter = '';
  searchQuery = '';
  dateFrom = '';
  dateTo = '';

  showDetailsModal = false;
  showUpdateModal = false;
  showRemarkModal = false;

  isLoading = false;
  isSubmitting = false;

  showSuccessPopup = false;
  showErrorPopup = false;
  popupMessage = '';

  updateForm = {
    status: '',
    subStatus: '',
    priority: '',
    remark: '',
    nextFollowUpDate: '',
    bankName: '',
    applicationNumber: '',
    sanctionedAmount: 0,
    interestRate: 0,
    tenure: 0
  };

  remarkMessage = '';

  statusOptions = [
    'pending',
    'in-progress',
    'documents-pending',
    'approved',
    'disbursed',
    'rejected',
    'cancelled'
  ];

  subStatusOptions = [
    'fresh',
    'follow-up',
    'callback',
    'meeting-scheduled',
    'documentation',
    'verification',
    'bank-processing',
    'final-approval'
  ];

  priorityOptions = ['low', 'medium', 'high', 'urgent'];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadDashboardStats();
    this.loadLeads();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  loadDashboardStats() {
    this.http.get<any>(`${this.apiUrl}/employee/dashboard/stats`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (response) => {
        this.dashboardStats = response.stats;
      },
      error: (error) => {
        console.error('Stats error:', error);
      }
    });
  }

  loadLeads() {
    this.isLoading = true;

    let url = `${this.apiUrl}/employee/assigned?page=${this.currentPage}&limit=${this.limit}`;

    if (this.statusFilter) url += `&status=${this.statusFilter}`;
    if (this.priorityFilter) url += `&priority=${this.priorityFilter}`;
    if (this.searchQuery) url += `&search=${this.searchQuery}`;
    if (this.dateFrom) url += `&dateFrom=${this.dateFrom}`;
    if (this.dateTo) url += `&dateTo=${this.dateTo}`;

    this.http.get<any>(url, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        this.leads = response.leads;
        this.totalLeads = response.total;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to load leads');
        this.isLoading = false;
      }
    });
  }

  viewLeadDetails(leadId: string) {
    this.isLoading = true;

    this.http.get<any>(`${this.apiUrl}/employee/${leadId}`, {
      headers: this.getHeaders()
    }).subscribe({
      next: (response) => {
        this.selectedLead = response.lead;
        this.showDetailsModal = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to load lead');
        this.isLoading = false;
      }
    });
  }

  openUpdateModal() {
    if (!this.selectedLead) return;

    this.updateForm = {
      status: this.selectedLead.status,
      subStatus: this.selectedLead.subStatus || '',
      priority: this.selectedLead.priority,
      remark: '',
      nextFollowUpDate: this.selectedLead.nextFollowUpDate || '',
      bankName: this.selectedLead.bankName || '',
      applicationNumber: this.selectedLead.applicationNumber || '',
      sanctionedAmount: this.selectedLead.sanctionedAmount || 0,
      interestRate: this.selectedLead.interestRate || 0,
      tenure: this.selectedLead.tenure || 0
    };

    this.showUpdateModal = true;
  }

  updateLeadStatus() {
    if (!this.selectedLead) return;

    this.isSubmitting = true;

    const payload: any = {};

    if (this.updateForm.status !== this.selectedLead.status) {
      payload.status = this.updateForm.status;
    }
    if (this.updateForm.subStatus) payload.subStatus = this.updateForm.subStatus;
    if (this.updateForm.priority !== this.selectedLead.priority) {
      payload.priority = this.updateForm.priority;
    }
    if (this.updateForm.remark) payload.remark = this.updateForm.remark;
    if (this.updateForm.nextFollowUpDate) {
      payload.nextFollowUpDate = this.updateForm.nextFollowUpDate;
    }
    if (this.updateForm.bankName) payload.bankName = this.updateForm.bankName;
    if (this.updateForm.applicationNumber) {
      payload.applicationNumber = this.updateForm.applicationNumber;
    }
    if (this.updateForm.sanctionedAmount > 0) {
      payload.sanctionedAmount = this.updateForm.sanctionedAmount;
    }
    if (this.updateForm.interestRate > 0) {
      payload.interestRate = this.updateForm.interestRate;
    }
    if (this.updateForm.tenure > 0) payload.tenure = this.updateForm.tenure;

    this.http.put<any>(
      `${this.apiUrl}/employee/${this.selectedLead._id}/status`,
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Lead updated successfully!');
        this.closeUpdateModal();
        this.loadLeads();
        this.loadDashboardStats();
        this.viewLeadDetails(this.selectedLead!._id);
        this.isSubmitting = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to update lead');
        this.isSubmitting = false;
      }
    });
  }

  addRemark() {
    if (!this.remarkMessage.trim() || !this.selectedLead) {
      this.showError('Please enter a remark');
      return;
    }

    this.isSubmitting = true;

    this.http.post<any>(
      `${this.apiUrl}/${this.selectedLead._id}/remark`,
      { message: this.remarkMessage },
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Remark added successfully!');
        this.remarkMessage = '';
        this.closeRemarkModal();
        this.viewLeadDetails(this.selectedLead!._id);
        this.isSubmitting = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to add remark');
        this.isSubmitting = false;
      }
    });
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadLeads();
  }

  resetFilters() {
    this.statusFilter = '';
    this.priorityFilter = '';
    this.searchQuery = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.currentPage = 1;
    this.loadLeads();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadLeads();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLeads();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLeads();
    }
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedLead = null;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }

  openRemarkModal() {
    this.showRemarkModal = true;
  }

  closeRemarkModal() {
    this.showRemarkModal = false;
    this.remarkMessage = '';
  }

  showSuccess(message: string) {
    this.popupMessage = message;
    this.showSuccessPopup = true;
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 3000);
  }

  showError(message: string) {
    this.popupMessage = message;
    this.showErrorPopup = true;
    setTimeout(() => {
      this.showErrorPopup = false;
    }, 4000);
  }

  getStatusBadgeClass(status: string): string {
    const classes: any = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'documents-pending': 'status-documents',
      'approved': 'status-approved',
      'disbursed': 'status-disbursed',
      'rejected': 'status-rejected',
      'cancelled': 'status-cancelled'
    };
    return classes[status] || 'status-default';
  }

  getPriorityBadgeClass(priority: string): string {
    const classes: any = {
      'urgent': 'priority-urgent',
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return classes[priority] || 'priority-default';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getStatusCount(status: string): number {
    return this.dashboardStats?.byStatus?.[status]?.count || 0;
  }

  getPriorityCount(priority: string): number {
    return this.dashboardStats?.byPriority?.[priority] || 0;
  }

  getTodayFollowups(): number {
    return this.dashboardStats?.todayFollowups || 0;
  }

  getOverdueTasks(): number {
    return this.dashboardStats?.overdueTasks || 0;
  }
}
