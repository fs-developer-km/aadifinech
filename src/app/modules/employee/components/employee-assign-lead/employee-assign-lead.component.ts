import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as XLSX from 'xlsx';

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
  status?: 'pending' | 'success';
}

// ✅ NEW: shape of a partner-created lead (from PartnerLead model / partnerLead.controller.js)
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
  partnerName?: string;
  applicationNumber?: string;
  submittedDate: string;
  submittedTime: string;
  submittedBy?: { name?: string; companyName?: string };
  assignedEmployee?: { _id: string; name: string; email?: string; mobile?: string };
  assignedManager?: { _id: string; name: string; email?: string; mobile?: string };
  remarks?: any[];
  statusHistory?: any[];
  nextFollowUpDate?: string;
}

@Component({
  selector: 'app-employee-assign-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-assign-lead.component.html',
  styleUrl: './employee-assign-lead.component.css'
})
export class EmployeeAssignLeadComponent implements OnInit {
  // ==================== EXISTING (Admin-assigned leads) — UNTOUCHED ====================
  leads: Lead[] = [];
  selectedLead: Lead | null = null;
  showDetailsModal: boolean = false;
  filterStatus: string = 'All';
  searchTerm: string = '';
  loading: boolean = false;

  viewMode: 'grid' | 'table' = 'grid';

  showConfirmModal: boolean = false;
  confirmAction: 'pending' | 'success' | null = null;
  confirmLead: Lead | null = null;

  currentPage: number = 1;
  itemsPerPage: number = 12;

  openDropdownId: string | null = null;

  private apiUrl = 'https://api.aadifintech.com/api/lead/list';

  // ==================== NEW: Partner Leads tab ====================
  // ✅ Confirmed against partnerLead.routes.js — always points at the live API,
  // regardless of whether the Angular app itself runs on localhost or production.
  private partnerLeadBase = 'https://api.aadifintech.com/api/partnerLead';
  private partnerAssignedUrl = `${this.partnerLeadBase}/employee/assigned`;              // -> getAssignedLeads
  private partnerLeadByIdUrl = (id: string) => `${this.partnerLeadBase}/employee/${id}`; // -> getLeadById
  private partnerStatusUrl = (id: string) => `${this.partnerLeadBase}/employee/${id}/status`; // -> updateLeadStatus
  private partnerRemarkUrl = (id: string) => `${this.partnerLeadBase}/${id}/remark`;     // -> addRemarkToLead (no /employee prefix)
  private partnerDashboardStatsUrl = `${this.partnerLeadBase}/employee/dashboard/stats`; // -> getEmployeeDashboardStats (available if needed later)

  activeTab: 'admin' | 'partner' = 'admin';

  partnerLeads: PartnerLead[] = [];
  partnerLoading: boolean = false;
  partnerSearchTerm: string = '';
  partnerFilterStatus: string = 'All';
  partnerCurrentPage: number = 1;
  partnerItemsPerPage: number = 12;
  partnerViewMode: 'grid' | 'table' = 'grid';
  partnerOpenDropdownId: string | null = null;

  selectedPartnerLead: PartnerLead | null = null;
  showPartnerDetailsModal: boolean = false;

  showPartnerRemarkModal: boolean = false;
  partnerRemarkMessage: string = '';
  partnerSubmitting: boolean = false;

  // ✅ NEW: per-row loading state + toast feedback for status changes
  updatingStatusId: string | null = null;
  showPartnerToastFlag: boolean = false;
  partnerToastMessage: string = '';
  partnerToastType: 'success' | 'error' = 'success';

  partnerStatusOptions = [
    'pending', 'in-progress', 'documents-pending',
    'approved', 'disbursed', 'rejected', 'cancelled'
  ];

  constructor(private http: HttpClient) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn-dropdown') && !target.closest('.dropdown-menu')) {
      this.openDropdownId = null;
      this.partnerOpenDropdownId = null;
    }
  }

  ngOnInit(): void {
    this.fetchLeads();
    this.fetchPartnerLeads();
  }

  switchTab(tab: 'admin' | 'partner'): void {
    this.activeTab = tab;
    if (tab === 'partner' && this.partnerLeads.length === 0) {
      this.fetchPartnerLeads();
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ==================== EXISTING methods — UNTOUCHED ====================

  fetchLeads(): void {
    this.loading = true;

    this.http.get<any>(this.apiUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        console.log('API Response:', response);

        if (response.success && Array.isArray(response.leads)) {
          this.leads = response.leads.map((lead: any) => ({
            ...lead,
            _id: String(lead._id?.$oid || lead._id),
            status: lead.status || 'pending'
          }));

          console.log('Leads loaded:', this.leads.length);
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

  toggleDropdown(leadId: any, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    const id = String(leadId);

    if (this.openDropdownId === id) {
      this.openDropdownId = null;
    } else {
      this.openDropdownId = id;
    }
  }

  viewDetails(lead: Lead, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedLead = lead;
    this.showDetailsModal = true;
    this.openDropdownId = null;
  }

  updateToPending(lead: Lead, event: Event): void {
    event.stopPropagation();
    this.confirmLead = lead;
    this.confirmAction = 'pending';
    this.showConfirmModal = true;
    this.openDropdownId = null;
  }

  updateToSuccess(lead: Lead, event: Event): void {
    event.stopPropagation();
    this.confirmLead = lead;
    this.confirmAction = 'success';
    this.showConfirmModal = true;
    this.openDropdownId = null;
  }

  confirmStatusUpdate(): void {
    if (this.confirmLead && this.confirmAction) {
      this.updateLeadStatus(this.confirmLead._id, this.confirmAction);
      this.closeConfirmModal();
    }
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmAction = null;
    this.confirmLead = null;
  }

  updateLeadStatus(leadId: string, status: 'pending' | 'success'): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Authentication token not found. Please login again.');
      return;
    }

    this.http.put(
      `https://api.aadifintech.com/api/lead/update-status/${leadId}`,
      { status },
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (response: any) => {
        console.log("Status Updated Successfully:", response);

        const index = this.leads.findIndex(l => l._id === leadId);
        if (index !== -1) {
          this.leads[index].status = status;
          this.leads = [...this.leads];
        }
      },
      error: (error) => {
        console.error("Error updating status:", error);
        if (error.status === 401) {
          alert('Session expired. Please login again.');
        } else if (error.status === 404) {
          alert('Lead not found.');
        } else {
          alert('Failed to update status. Please try again.');
        }
      }
    });
  }

  closeModal(): void {
    this.showDetailsModal = false;
    this.selectedLead = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'status-success';
      case 'pending': return 'status-pending';
      default: return 'status-pending';
    }
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

  getTotalPages(): number {
    return Math.ceil(this.getFilteredLeads().length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      } else if (this.currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  }

  getPendingCount(): number {
    if (!Array.isArray(this.leads)) return 0;
    return this.leads.filter(lead => lead.status === 'pending').length;
  }

  getSuccessCount(): number {
    if (!Array.isArray(this.leads)) return 0;
    return this.leads.filter(lead => lead.status === 'success').length;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'table' : 'grid';
  }

  exportToExcel(): void {
    const leads = this.getFilteredLeads();

    const excelData = leads.map((lead, index) => ({
      'S.No': index + 1,
      'Lead Name': lead.leadName,
      'Phone': lead.leadPhone,
      'Submitted Date': lead.submittedDate,
      'Submitted Time': lead.submittedTime,
      'Source': lead.leadSource,
      'Notes': lead.notes,
      'Assigned To': lead.assignTo.name,
      'Assigned Mobile': lead.assignTo.mobile,
      'Status': (lead.status || 'pending').toUpperCase(),
      'Created At': new Date(lead.createdAt).toLocaleString('en-IN'),
      'Updated At': new Date(lead.updatedAt).toLocaleString('en-IN')
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);

    const colWidths = [
      { wch: 6 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 12 },
      { wch: 15 }, { wch: 30 }, { wch: 20 }, { wch: 15 }, { wch: 12 },
      { wch: 20 }, { wch: 20 }
    ];
    ws['!cols'] = colWidths;

    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1";
      if (!ws[address]) continue;
      ws[address].s = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "DD3333" } },
        alignment: { horizontal: "center", vertical: "center" }
      };
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Assigned Leads');

    const fileName = `Assigned_Leads_${new Date().toLocaleDateString('en-IN').replace(/\//g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }

  // ==================== NEW: Partner Leads methods ====================

  fetchPartnerLeads(): void {
    this.partnerLoading = true;

    this.http.get<any>(this.partnerAssignedUrl, { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        console.log('Partner Leads API Response:', response);

        if (response.success && Array.isArray(response.leads)) {
          this.partnerLeads = response.leads;
        } else {
          this.partnerLeads = [];
          console.warn('Unexpected partner-lead API response format');
        }

        this.partnerLoading = false;
      },
      error: (error) => {
        console.error('Error fetching partner leads:', error);
        this.partnerLeads = [];
        this.partnerLoading = false;
      }
    });
  }

  toggleViewModePartner(): void {
    this.partnerViewMode = this.partnerViewMode === 'grid' ? 'table' : 'grid';
  }

  togglePartnerDropdown(leadId: string, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.partnerOpenDropdownId = this.partnerOpenDropdownId === leadId ? null : leadId;
  }

  viewPartnerDetails(lead: PartnerLead, event?: Event): void {
    if (event) event.stopPropagation();

    // fetch fresh full detail (remarks/status history) by id
    this.http.get<any>(this.partnerLeadByIdUrl(lead._id), { headers: this.getAuthHeaders() }).subscribe({
      next: (response) => {
        this.selectedPartnerLead = response.success ? response.lead : lead;
        this.showPartnerDetailsModal = true;
      },
      error: () => {
        // fall back to the row data we already have
        this.selectedPartnerLead = lead;
        this.showPartnerDetailsModal = true;
      }
    });

    this.partnerOpenDropdownId = null;
  }

  closePartnerModal(): void {
    this.showPartnerDetailsModal = false;
    this.selectedPartnerLead = null;
  }

updatePartnerStatus(lead: PartnerLead, newStatus: string, event?: Event): void {
  if (event) event.stopPropagation();
  this.partnerOpenDropdownId = null;
  this.updatingStatusId = lead._id;

  this.http.put<any>(
    this.partnerStatusUrl(lead._id),
    { status: newStatus },
    { headers: this.getAuthHeaders() }
  ).subscribe({
    next: (response) => {
      const index = this.partnerLeads.findIndex(l => l._id === lead._id);
      if (index !== -1) {
        this.partnerLeads[index].status = newStatus;
        this.partnerLeads = [...this.partnerLeads];
      }
      if (this.selectedPartnerLead && this.selectedPartnerLead._id === lead._id) {
        this.selectedPartnerLead.status = newStatus;
      }
      this.updatingStatusId = null;
      this.showPartnerToast(`Status updated to "${newStatus}"`, 'success');
    },
    error: (error) => {
      console.error('Error updating partner lead status:', error);
      this.updatingStatusId = null;
      this.showPartnerToast(error.error?.msg || 'Failed to update status. Please try again.', 'error');
    }
  });
}



  openPartnerRemarkModal(): void {
    this.showPartnerRemarkModal = true;
  }

  closePartnerRemarkModal(): void {
    this.showPartnerRemarkModal = false;
    this.partnerRemarkMessage = '';
  }

  addPartnerRemark(): void {
    if (!this.partnerRemarkMessage.trim() || !this.selectedPartnerLead) return;

    this.partnerSubmitting = true;

    this.http.post<any>(
      this.partnerRemarkUrl(this.selectedPartnerLead._id),
      { message: this.partnerRemarkMessage },
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (response) => {
        if (this.selectedPartnerLead) {
          this.selectedPartnerLead.remarks = response.remarks;
        }
        this.partnerRemarkMessage = '';
        this.showPartnerRemarkModal = false;
        this.partnerSubmitting = false;
      },
      error: (error) => {
        console.error('Error adding remark:', error);
        alert(error.error?.msg || 'Failed to add remark.');
        this.partnerSubmitting = false;
      }
    });
  }

  getPartnerStatusClass(status: string): string {
    const map: { [key: string]: string } = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'documents-pending': 'status-documents',
      'approved': 'status-approved',
      'disbursed': 'status-disbursed',
      'rejected': 'status-rejected',
      'cancelled': 'status-cancelled'
    };
    return map[status] || 'status-pending';
  }

  getPartnerPriorityClass(priority: string): string {
    const map: { [key: string]: string } = {
      'urgent': 'priority-urgent',
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return map[priority] || 'priority-medium';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  }

  getPartnerFilteredLeads(): PartnerLead[] {
    if (!Array.isArray(this.partnerLeads)) return [];

    let filtered = this.partnerLeads;

    if (this.partnerFilterStatus !== 'All') {
      filtered = filtered.filter(l => l.status === this.partnerFilterStatus);
    }

    if (this.partnerSearchTerm) {
      const term = this.partnerSearchTerm.toLowerCase();
      filtered = filtered.filter(l =>
        l.customerName?.toLowerCase().includes(term) ||
        l.customerMobile?.includes(term) ||
        (l.applicationNumber || '').toLowerCase().includes(term) ||
        (l.partnerName || '').toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getPartnerPaginatedLeads(): PartnerLead[] {
    const filtered = this.getPartnerFilteredLeads();
    const start = (this.partnerCurrentPage - 1) * this.partnerItemsPerPage;
    return filtered.slice(start, start + this.partnerItemsPerPage);
  }

  getPartnerTotalPages(): number {
    return Math.ceil(this.getPartnerFilteredLeads().length / this.partnerItemsPerPage) || 1;
  }

  goToPartnerPage(page: number): void {
    if (page >= 1 && page <= this.getPartnerTotalPages()) {
      this.partnerCurrentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPartnerPageNumbers(): number[] {
    const totalPages = this.getPartnerTotalPages();
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  }

  getPartnerPendingCount(): number {
    return this.partnerLeads.filter(l => l.status === 'pending').length;
  }

  getPartnerDisbursedCount(): number {
    return this.partnerLeads.filter(l => l.status === 'disbursed').length;
  }



private partnerToastTimeout: any;

showPartnerToast(message: string, type: 'success' | 'error'): void {
  this.partnerToastMessage = message;
  this.partnerToastType = type;
  this.showPartnerToastFlag = true;

  if (this.partnerToastTimeout) clearTimeout(this.partnerToastTimeout);
  this.partnerToastTimeout = setTimeout(() => {
    this.showPartnerToastFlag = false;
  }, 3000);
}




}