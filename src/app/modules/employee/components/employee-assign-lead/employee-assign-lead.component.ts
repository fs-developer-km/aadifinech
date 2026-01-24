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

@Component({
  selector: 'app-employee-assign-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-assign-lead.component.html',
  styleUrl: './employee-assign-lead.component.css'
})
export class EmployeeAssignLeadComponent implements OnInit {
  leads: Lead[] = [];
  selectedLead: Lead | null = null;
  showDetailsModal: boolean = false;
  filterStatus: string = 'All';
  searchTerm: string = '';
  loading: boolean = false;

  // View mode toggle
  viewMode: 'grid' | 'table' = 'grid';

  // Confirmation modal properties
  showConfirmModal: boolean = false;
  confirmAction: 'pending' | 'success' | null = null;
  confirmLead: Lead | null = null;

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 12;

  // Dropdown state
  openDropdownId: string | null = null;

  private apiUrl = 'https://api.aadifintech.com/api/lead/list';

  constructor(private http: HttpClient) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.btn-dropdown') && !target.closest('.dropdown-menu')) {
      this.openDropdownId = null;
    }
  }

  ngOnInit(): void {
    this.fetchLeads();
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

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.put(
      `https://api.aadifintech.com/api/lead/update-status/${leadId}`,
      { status },
      { headers }
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

    // Set column widths
    const colWidths = [
      { wch: 6 },  // S.No
      { wch: 20 }, // Lead Name
      { wch: 15 }, // Phone
      { wch: 15 }, // Date
      { wch: 12 }, // Time
      { wch: 15 }, // Source
      { wch: 30 }, // Notes
      { wch: 20 }, // Assigned To
      { wch: 15 }, // Assigned Mobile
      { wch: 12 }, // Status
      { wch: 20 }, // Created At
      { wch: 20 }  // Updated At
    ];
    ws['!cols'] = colWidths;

    // Style the header row
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
}