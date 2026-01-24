import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ConveyanceEntry {
  date: string;
  fromLocation: string;
  toLocation: string;
  distance: number;
  mode: string;
  amount: number;
  purpose: string;
  remarks?: string;
}

interface Conveyance {
  _id: string;
  employeeId: string;
  employeeName: string;
  employeeMobile: string;
  month: string;
  year: number;
  entries?: ConveyanceEntry[];
  totalDistance: number;
  totalAmount: number;
  status: string;
  submittedAt?: Date;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  adminRemarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Statistics {
  overall: {
    totalConveyances: number;
    totalAmount: number;
    totalDistance: number;
  };
  byStatus: Array<{
    _id: string;
    count: number;
    totalAmount: number;
    totalDistance: number;
  }>;
}

@Component({
  selector: 'app-admin-conveyance',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-conveyance.component.html',
  styleUrls: ['./admin-conveyance.component.css']
})
export class AdminConveyanceComponent implements OnInit {
  // API Configuration
  // private apiUrl = 'http://localhost:5000/api'; // Change as per your backend
  private apiUrl = 'https://api.aadifintech.com/api'; // Change as per your backend
  private token = localStorage.getItem('token') || '';
  
  // Data
  conveyances: Conveyance[] = [];
  filteredConveyances: Conveyance[] = [];
  statistics: Statistics | null = null;
  selectedConveyance: Conveyance | null = null;
  
  // UI State
  loading = false;
  saving = false;
  viewMode: 'card' | 'table' = 'card';
  
  // Filters
  filters = {
    month: this.getCurrentMonth(),
    status: '',
    employeeId: '',
    employeeName: ''
  };
  
  // Modals
  showDetailsModal = false;
  showApproveModal = false;
  showRejectModal = false;
  
  // Form Data
  approveRemarks = '';
  rejectReason = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadConveyances();
  }

  // =============================================
  // HTTP Headers
  // =============================================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  // =============================================
  // Utility Functions
  // =============================================
  getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  // =============================================
  // Load Data Functions
  // =============================================
  loadStatistics(): void {
    let url = `${this.apiUrl}/conveyance/admin/stats`;
    
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      url += `?month=${this.filters.month}&year=${year}`;
    }
    
    this.http.get<any>(url, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.statistics = response.data;
          console.log('Statistics loaded:', this.statistics);
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
          this.showError('Failed to load statistics');
        }
      });
  }

  loadConveyances(): void {
    this.loading = true;
    
    let url = `${this.apiUrl}/conveyance/admin/all`;
    const params = new URLSearchParams();
    
    if (this.filters.status) params.append('status', this.filters.status);
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      params.append('month', this.filters.month);
      params.append('year', year);
    }
    if (this.filters.employeeId) params.append('employeeId', this.filters.employeeId);
    
    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    
    this.http.get<any>(finalUrl, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.conveyances = response.data || [];
          this.filterByName();
          this.loading = false;
          console.log('Conveyances loaded:', this.conveyances);
        },
        error: (error) => {
          console.error('Error loading conveyances:', error);
          this.showError('Failed to load conveyances');
          this.loading = false;
        }
      });
  }

  filterByName(): void {
    if (!this.filters.employeeName || this.filters.employeeName.trim() === '') {
      this.filteredConveyances = [...this.conveyances];
    } else {
      const searchTerm = this.filters.employeeName.toLowerCase().trim();
      this.filteredConveyances = this.conveyances.filter(c => 
        c.employeeName.toLowerCase().includes(searchTerm) ||
        c.employeeMobile.includes(searchTerm)
      );
    }
  }

  refreshData(): void {
    this.loadStatistics();
    this.loadConveyances();
  }

  clearFilters(): void {
    this.filters = {
      month: this.getCurrentMonth(),
      status: '',
      employeeId: '',
      employeeName: ''
    };
    this.loadStatistics();
    this.loadConveyances();
  }

  // =============================================
  // Admin Actions - Approve
  // =============================================
  approveConveyance(): void {
    if (!this.selectedConveyance) return;
    
    this.saving = true;
    
    const payload: any = {};
    if (this.approveRemarks && this.approveRemarks.trim()) {
      payload.adminRemarks = this.approveRemarks.trim();
    }

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${this.selectedConveyance._id}/approve`,
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance approved successfully');
        this.closeApproveModal();
        this.refreshData();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error approving conveyance:', error);
        this.showError(error.error?.msg || 'Failed to approve conveyance');
        this.saving = false;
      }
    });
  }

  // =============================================
  // Admin Actions - Reject
  // =============================================
  rejectConveyance(): void {
    if (!this.selectedConveyance || !this.rejectReason || this.rejectReason.trim() === '') {
      this.showError('Please enter rejection reason');
      return;
    }

    this.saving = true;

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${this.selectedConveyance._id}/reject`,
      { rejectionReason: this.rejectReason.trim() },
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance rejected');
        this.closeRejectModal();
        this.refreshData();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error rejecting conveyance:', error);
        this.showError(error.error?.msg || 'Failed to reject conveyance');
        this.saving = false;
      }
    });
  }

  // =============================================
  // Admin Actions - Mark as Paid
  // =============================================
  markAsPaid(conveyanceId: string): void {
    if (!confirm('Are you sure you want to mark this conveyance as paid?')) {
      return;
    }

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${conveyanceId}/mark-paid`,
      {},
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance marked as paid successfully');
        this.refreshData();
      },
      error: (error) => {
        console.error('Error marking as paid:', error);
        this.showError(error.error?.msg || 'Failed to mark as paid');
      }
    });
  }

  // =============================================
  // Modal Functions - Details
  // =============================================
  viewDetails(conveyance: Conveyance): void {
    this.selectedConveyance = conveyance;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedConveyance = null;
  }

  // =============================================
  // Modal Functions - Approve
  // =============================================
  openApproveModal(conveyance: Conveyance): void {
    this.selectedConveyance = conveyance;
    this.approveRemarks = '';
    this.showApproveModal = true;
  }

  closeApproveModal(): void {
    this.showApproveModal = false;
    this.selectedConveyance = null;
    this.approveRemarks = '';
  }

  // =============================================
  // Modal Functions - Reject
  // =============================================
  openRejectModal(conveyance: Conveyance): void {
    this.selectedConveyance = conveyance;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.selectedConveyance = null;
    this.rejectReason = '';
  }

  // =============================================
  // Helper Functions
  // =============================================
  getPendingCount(): number {
    if (!this.statistics?.byStatus) return 0;
    const submitted = this.statistics.byStatus.find(s => s._id === 'submitted');
    return submitted?.count || 0;
  }

  // =============================================
  // Notification Functions
  // =============================================
  showSuccess(message: string): void {
    alert(message); // Replace with toast/snackbar library
    // Example: this.toastr.success(message);
  }

  showError(message: string): void {
    alert(message); // Replace with toast/snackbar library
    // Example: this.toastr.error(message);
  }
}