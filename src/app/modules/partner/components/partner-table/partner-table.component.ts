import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface PartnerLead {
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
  assignedEmployee?: {
    name: string;
    email: string;
    mobile: string;
  };
  assignedManager?: {
    name: string;
    email: string;
    mobile: string;
  };
  submittedDate: string;
  submittedTime: string;
  createdAt: string;
  remarks?: any[];
  statusHistory?: any[];
  nextFollowUpDate?: string;
}

interface LeadStats {
  [key: string]: number;
}

@Component({
  selector: 'app-partner-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partner-table.component.html',
  styleUrl: './partner-table.component.css'
})
export class PartnerTableComponent implements OnInit {
  private apiUrl = 'https://api.aadifintech.com/api/partnerLead';
  private token = localStorage.getItem('token') || '';

  // Data
  leads: PartnerLead[] = [];
  selectedLead: PartnerLead | null = null;
  stats: LeadStats = {};

  // Pagination
  currentPage = 1;
  limit = 10;
  totalPages = 1;
  totalLeads = 0;

  // Filters
  statusFilter = '';
  searchQuery = '';

  // Modals
  showCreateModal = false;
  showDetailsModal = false;
  showRemarkModal = false;

  // Loading
  isLoading = false;
  isSubmitting = false;

  // Messages
  showSuccessPopup = false;
  showErrorPopup = false;
  popupMessage = '';

  // Create Lead Form
  newLead = {
    customerName: '',
    customerMobile: '',
    customerEmail: '',
    loanType: 'Personal Loan',
    loanAmount: 0,
    monthlyIncome: 0,
    employmentType: 'Salaried',
    remarks: ''
  };

  // Remark Form
  remarkMessage = '';

  loanTypes = [
    'Personal Loan',
    'Home Loan',
    'Business Loan',
    'Car Loan',
    'Education Loan',
    'Gold Loan',
    'Other'
  ];

  employmentTypes = [
    'Salaried',
    'Self-Employed',
    'Business',
    'Professional',
    'Other'
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadLeads();
  }

  // HTTP Headers
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  // Load Leads
  loadLeads() {
    this.isLoading = true;
    
    let url = `https://api.aadifintech.com/api/partnerLead/partner/my-leads?page=${this.currentPage}&limit=${this.limit}`;
    
    if (this.statusFilter) {
      url += `&status=${this.statusFilter}`;
    }
    
    if (this.searchQuery) {
      url += `&search=${this.searchQuery}`;
    }

    this.http.get<any>(url, { headers: this.getHeaders() }).subscribe({
      next: (response) => {
        this.leads = response.leads;
        this.totalLeads = response.total;
        this.totalPages = response.totalPages;
        this.stats = response.stats;
        console.log("statsssssss",this.stats);
        this.isLoading = false;

        console.log("partner lead data...",this.leads)
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to load leads');
        this.isLoading = false;
      }
    });
  }

  // Create Lead
  createLead() {
    if (!this.validateLeadForm()) {
      return;
    }

    this.isSubmitting = true;

    this.http.post<any>(`${this.apiUrl}/partner/create`, this.newLead, { 
      headers: this.getHeaders() 
    }).subscribe({
      next: (response) => {
        this.showSuccess('Lead created successfully!');
        this.closeCreateModal();
        this.resetForm();
        this.loadLeads();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to create lead');
        this.isSubmitting = false;
      }
    });
  }

  // Get Lead Details
  viewLeadDetails(leadId: string) {
    this.isLoading = true;

    this.http.get<any>(`${this.apiUrl}/partner/${leadId}`, { 
      headers: this.getHeaders() 
    }).subscribe({
      next: (response) => {
        this.selectedLead = response.lead;
        this.showDetailsModal = true;
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.msg || 'Failed to load lead details');
        this.isLoading = false;
      }
    });
  }

  // Add Remark
  addRemark() {
    if (!this.remarkMessage.trim()) {
      this.showError('Please enter a remark');
      return;
    }

    if (!this.selectedLead) return;

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

  // Validate Form
  validateLeadForm(): boolean {
    if (!this.newLead.customerName.trim()) {
      this.showError('Customer name is required');
      return false;
    }

    if (!this.newLead.customerMobile.trim()) {
      this.showError('Customer mobile is required');
      return false;
    }

    const mobileRegex = /^\+?\d{10,15}$/;
    if (!mobileRegex.test(this.newLead.customerMobile)) {
      this.showError('Invalid mobile number format');
      return false;
    }

    if (this.newLead.loanAmount <= 0) {
      this.showError('Loan amount must be greater than 0');
      return false;
    }

    return true;
  }

  // Pagination
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

  // Filter
  applyFilter() {
    this.currentPage = 1;
    this.loadLeads();
  }

  resetFilters() {
    this.statusFilter = '';
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadLeads();
  }

  // Modals
  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedLead = null;
  }

  openRemarkModal() {
    this.showRemarkModal = true;
  }

  closeRemarkModal() {
    this.showRemarkModal = false;
    this.remarkMessage = '';
  }

  // Reset Form
  resetForm() {
    this.newLead = {
      customerName: '',
      customerMobile: '',
      customerEmail: '',
      loanType: 'Personal Loan',
      loanAmount: 0,
      monthlyIncome: 0,
      employmentType: 'Salaried',
      remarks: ''
    };
  }

  // Popup Messages
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

  // Utility
  getStatusBadgeClass(status: string): string {
    const statusClasses: { [key: string]: string } = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'documents-pending': 'status-documents',
      'approved': 'status-approved',
      'disbursed': 'status-disbursed',
      'rejected': 'status-rejected',
      'cancelled': 'status-cancelled'
    };
    return statusClasses[status] || 'status-default';
  }

  getPriorityBadgeClass(priority: string): string {
    const priorityClasses: { [key: string]: string } = {
      'urgent': 'priority-urgent',
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return priorityClasses[priority] || 'priority-default';
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

  getStatsCount(status: string): number {
    return this.stats[status] || 0;
  }
}