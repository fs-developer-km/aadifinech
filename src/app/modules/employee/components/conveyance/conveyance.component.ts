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
  // entries: ConveyanceEntry[];
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

@Component({
  selector: 'app-conveyance',
   imports: [CommonModule,FormsModule],
  templateUrl: './conveyance.component.html',
  styleUrls: ['./conveyance.component.css']
})
export class ConveyanceComponent implements OnInit {
  // API Configuration
  // private apiUrl = 'http://localhost:5000/api'; // Change as per your backend
  private apiUrl = 'https://api.aadifintech.com/api'; // Change as per your backend
  private token = localStorage.getItem('token') || '';
  
  // User Info
  userRole: string = 'employee'; // Get from localStorage or auth service
  
  // Data
  conveyances: Conveyance[] = [];
  statistics: any = null;
  
  // UI State
  loading = false;
  saving = false;
  expandedCard: string | null = null;
  
  // Filters
  filters = {
    month: this.getCurrentMonth(),
    status: '',
    employeeId: ''
  };
  
  // Modals
  showModal = false;
  showApproveModal = false;
  showRejectModal = false;
  isEditMode = false;
  
  // Form Data
  conveyanceForm: any = {
    month: this.getCurrentMonth(),
    year: new Date().getFullYear(),
    entries: [this.getEmptyEntry()]
  };
  
  selectedConveyanceId = '';
  approveRemarks = '';
  rejectReason = '';

  constructor(private http: HttpClient) {
    // Get user role from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role || 'employee';
  }

  ngOnInit(): void {
    this.loadConveyances();
    if (this.userRole === 'admin') {
      this.loadStatistics();
    }
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

  getEmptyEntry(): ConveyanceEntry {
    return {
      date: new Date().toISOString().split('T')[0],
      fromLocation: '',
      toLocation: '',
      distance: 0,
      mode: '',
      amount: 0,
      purpose: '',
      remarks: ''
    };
  }

  // =============================================
  // Load Data Functions
  // =============================================
  loadConveyances(): void {
    this.loading = true;
    
    let url = '';
    let params = new URLSearchParams();
    
    if (this.filters.status) params.append('status', this.filters.status);
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      params.append('month', this.filters.month);
      params.append('year', year);
    }
    
    if (this.userRole === 'employee') {
      url = `${this.apiUrl}/conveyance/my-conveyances`;
    } else {
      url = `${this.apiUrl}/conveyance/admin/all`;
      if (this.filters.employeeId) params.append('employeeId', this.filters.employeeId);
    }
    
    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    
    this.http.get<any>(finalUrl, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.conveyances = response.data || [];
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading conveyances:', error);
          this.showError('Failed to load conveyances');
          this.loading = false;
        }
      });
  }

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
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
        }
      });
  }

  // =============================================
  // CRUD Operations
  // =============================================
  saveConveyance(): void {
    // Validation
    if (!this.conveyanceForm.month || this.conveyanceForm.entries.length === 0) {
      this.showError('Please fill all required fields');
      return;
    }

    // Validate entries
    for (let entry of this.conveyanceForm.entries) {
      if (!entry.date || !entry.fromLocation || !entry.toLocation || 
          !entry.distance || !entry.mode || !entry.amount || !entry.purpose) {
        this.showError('Please fill all entry fields');
        return;
      }
    }

    this.saving = true;
    
    const [year, month] = this.conveyanceForm.month.split('-');
    const payload = {
      month: this.conveyanceForm.month,
      year: parseInt(year),
      entries: this.conveyanceForm.entries
    };

    this.http.post<any>(`${this.apiUrl}/conveyance`, payload, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.showSuccess(this.isEditMode ? 'Conveyance updated successfully' : 'Conveyance created successfully');
          this.closeModal();
          this.loadConveyances();
          this.saving = false;
        },
        error: (error) => {
          console.error('Error saving conveyance:', error);
          this.showError(error.error?.msg || 'Failed to save conveyance');
          this.saving = false;
        }
      });
  }

  submitConveyance(conveyanceId: string): void {
    if (!confirm('Are you sure you want to submit this conveyance for approval?')) {
      return;
    }

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/${conveyanceId}/submit`,
      {},
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance submitted successfully');
        this.loadConveyances();
      },
      error: (error) => {
        console.error('Error submitting conveyance:', error);
        this.showError(error.error?.msg || 'Failed to submit conveyance');
      }
    });
  }

  deleteConveyance(conveyanceId: string): void {
    if (!confirm('Are you sure you want to delete this conveyance?')) {
      return;
    }

    this.http.delete<any>(
      `${this.apiUrl}/conveyance/${conveyanceId}`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance deleted successfully');
        this.loadConveyances();
      },
      error: (error) => {
        console.error('Error deleting conveyance:', error);
        this.showError(error.error?.msg || 'Failed to delete conveyance');
      }
    });
  }

  // =============================================
  // Admin Actions
  // =============================================
  approveConveyance(): void {
    this.saving = true;
    
    const payload: any = {};
    if (this.approveRemarks) {
      payload.adminRemarks = this.approveRemarks;
    }

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${this.selectedConveyanceId}/approve`,
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance approved successfully');
        this.closeApproveModal();
        this.loadConveyances();
        this.loadStatistics();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error approving conveyance:', error);
        this.showError(error.error?.msg || 'Failed to approve conveyance');
        this.saving = false;
      }
    });
  }

  rejectConveyance(): void {
    if (!this.rejectReason) {
      this.showError('Please enter rejection reason');
      return;
    }

    this.saving = true;

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${this.selectedConveyanceId}/reject`,
      { rejectionReason: this.rejectReason },
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance rejected');
        this.closeRejectModal();
        this.loadConveyances();
        this.loadStatistics();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error rejecting conveyance:', error);
        this.showError(error.error?.msg || 'Failed to reject conveyance');
        this.saving = false;
      }
    });
  }

  markAsPaid(conveyanceId: string): void {
    if (!confirm('Mark this conveyance as paid?')) {
      return;
    }

    this.http.patch<any>(
      `${this.apiUrl}/conveyance/admin/${conveyanceId}/mark-paid`,
      {},
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showSuccess('Conveyance marked as paid');
        this.loadConveyances();
        this.loadStatistics();
      },
      error: (error) => {
        console.error('Error marking as paid:', error);
        this.showError(error.error?.msg || 'Failed to mark as paid');
      }
    });
  }

  // =============================================
  // Modal Functions
  // =============================================
  openAddModal(): void {
    this.isEditMode = false;
    this.conveyanceForm = {
      month: this.getCurrentMonth(),
      year: new Date().getFullYear(),
      entries: [this.getEmptyEntry()]
    };
    this.showModal = true;
  }

  editConveyance(conveyance: Conveyance): void {
    this.isEditMode = true;
    this.conveyanceForm = {
      month: conveyance.month,
      year: conveyance.year,
      entries: JSON.parse(JSON.stringify(conveyance.entries))
    };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.isEditMode = false;
  }

  openApproveModal(conveyance: Conveyance): void {
    this.selectedConveyanceId = conveyance._id;
    this.approveRemarks = '';
    this.showApproveModal = true;
  }

  closeApproveModal(): void {
    this.showApproveModal = false;
    this.selectedConveyanceId = '';
    this.approveRemarks = '';
  }

  openRejectModal(conveyance: Conveyance): void {
    this.selectedConveyanceId = conveyance._id;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.selectedConveyanceId = '';
    this.rejectReason = '';
  }

  // =============================================
  // Entry Management
  // =============================================
  addEntry(): void {
    this.conveyanceForm.entries.push(this.getEmptyEntry());
  }

  removeEntry(index: number): void {
    if (this.conveyanceForm.entries.length > 1) {
      this.conveyanceForm.entries.splice(index, 1);
    }
  }

  // =============================================
  // UI Helper Functions
  // =============================================
  toggleExpand(cardId: string): void {
    this.expandedCard = this.expandedCard === cardId ? null : cardId;
  }

  clearFilters(): void {
    this.filters = {
      month: this.getCurrentMonth(),
      status: '',
      employeeId: ''
    };
    this.loadConveyances();
  }

  getPendingCount(): number {
    if (!this.statistics?.byStatus) return 0;
    const submitted = this.statistics.byStatus.find((s: any) => s._id === 'submitted');
    return submitted?.count || 0;
  }

  // =============================================
  // Notification Functions
  // =============================================
  showSuccess(message: string): void {
    alert(message); // Replace with toast/snackbar
  }

  showError(message: string): void {
    alert(message); // Replace with toast/snackbar
  }
}