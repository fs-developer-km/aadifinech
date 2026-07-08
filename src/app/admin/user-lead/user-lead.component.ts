import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PageTrackerService } from '../../core/services/page-tracker.service';

interface AssignmentHistoryItem {
  employeeId: string;
  employeeName: string;
  assignedDate: string;
  status: 'pending' | 'completed';
  completedDate?: string;
}

interface LeadRecord {
  _id?: string;
  leadId?: string;
  leadName: string;
  leadPhone: string;
  leadEmail?: string;
  submittedDate: string;
  submittedTime: string;
  leadSource: string;
  leadStatus?: 'New' | 'Contacted' | 'Qualified' | 'Converted';
  notes: string;
  assignTo?: Employee | null;
  assignedDate?: string;
  status?: 'pending' | 'success';
  jobStatus?: 'pending' | 'completed';
  assignmentHistory?: AssignmentHistoryItem[];
}

interface Employee {
  _id: string;
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-lead.component.html',
  styleUrls: ['./user-lead.component.css']
})
export class UserLeadComponent implements OnInit {
  showForm = false;
  isLoading = false;
  isRefreshing = false; // ✅ manual refresh button ke liye
  message = '';
  messageType = '';
  isDeleting: boolean = false;

  newLeadForm = {
    leadName: '',
    leadPhone: '',
    notes: ''
  };

  private leadsSubject = new BehaviorSubject<LeadRecord[]>([]);
  leadsData$ = this.leadsSubject.asObservable();

  leadsData: LeadRecord[] = [];
  employees: Employee[] = [];
  searchQuery: string = '';
  sortBy: string = 'date';
  apiUrl = 'https://api.aadifintech.com/api/lead/list';
  employeeApiUrl = 'https://api.aadifintech.com/api/auth/employees';

  // Pagination
  currentPage: number = 1;
  leadsPerPage: number = 10;

  // Assignment
  assigningLeadId: string | null = null;
  showSuccessPopup = false;
  successMessage = '';

  // Accordion
  expandedLeadId: string | null = null;

  // Delete Modal
  showDeleteConfirm = false;
  leadToDelete: string | null = null;

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  private tableScrollBound = false;

  constructor(private http: HttpClient, private pagetrackerService: PageTrackerService) { }

  ngOnInit(): void {
    this.fetchLeads();
    this.fetchEmployees();
    this.initTableScroll();
    // ❌ Auto-refresh/polling hata diya — ab sirf manual refresh button se data update hoga
  }

  submitLead() {
    if (!this.newLeadForm.leadName || !this.newLeadForm.leadPhone) {
      this.message = 'Please fill in all required fields.';
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const apiUrl = 'https://api.aadifintech.com/api/lead/create';

    this.http.post(apiUrl, this.newLeadForm).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.message = '✅ Lead submitted successfully!';
        this.messageType = 'success';
        this.newLeadForm = { leadName: '', leadPhone: '', notes: '' };

        setTimeout(() => {
          this.showForm = false;
          this.message = '';
          this.fetchLeads();
        }, 2000);
      },
      error: (err) => {
        this.isLoading = false;
        this.message = '❌ Failed to submit lead. Try again.';
        this.messageType = 'error';
        console.error(err);
      }
    });
  }

  // ✅ Ek hi function — showLoader=true pe bada loader, false pe sirf refresh icon spin hota hai
  fetchLeads(showLoader: boolean = true): void {
    if (showLoader) {
      this.isLoading = true;
    } else {
      this.isRefreshing = true;
    }

    const token = localStorage.getItem('token');

    // ✅ Cache-busting headers + timestamp query param, taaki browser 304/stale response na de
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    });

    const url = `${this.apiUrl}?_=${Date.now()}`;

    this.http.get<{ success: boolean; leads: any[] }>(url, { headers })
      .subscribe({
        next: (res) => {
          if (res.success && res.leads) {
            this.leadsData = this.mapLeadsResponse(res.leads);
            this.pagetrackerService.updateTotalLeads(this.leadsData.length);
          }
          this.isLoading = false;
          this.isRefreshing = false;
        },
        error: (err) => {
          console.error('Error fetching leads:', err);
          this.isLoading = false;
          this.isRefreshing = false;
        }
      });
  }

  // ✅ Refresh button isko call karega
  refreshLeads(): void {
    this.fetchLeads(false);
  }

  // ✅ Backend response -> UI-friendly LeadRecord[]
private mapLeadsResponse(rawLeads: any[]): LeadRecord[] {
  return rawLeads.map((lead, index) => {
    const backendStatus = lead.status; // 'pending' | 'success'
    const jobStatus: 'pending' | 'completed' | undefined = lead.assignTo
      ? (backendStatus === 'success' ? 'completed' : 'pending')
      : undefined;

    const assignedDate = lead.assignedDate || (lead.assignTo ? this.getCurrentDate() : '');

    // Backend history chronological order me deta hai (oldest first) — UI ke liye newest first chahiye
    const assignmentHistory: AssignmentHistoryItem[] = (lead.assignmentHistory || [])
      .map((h: any) => ({
        employeeId: h.employee?._id || h.employee || '',
        employeeName: h.employeeName || h.employee?.name || 'Employee',
        assignedDate: h.assignedDate,
        status: h.status,
        completedDate: h.completedDate
      }))
      .reverse();

    return {
      ...lead,
      leadStatus: lead.leadStatus || 'New',
      leadId: lead.leadId || `#LEAD-${String(index + 1).padStart(3, '0')}`,
      assignedDate,
      jobStatus,
      assignmentHistory
    };
  });
}

  fetchEmployees(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<{ success: boolean; employees: Employee[] }>(this.employeeApiUrl, { headers }).subscribe({
      next: (res) => {
        if (res.success && res.employees) {
          this.employees = res.employees;
        }
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.employees = [
          { _id: '1', name: 'Rajesh Kumar', email: 'rajesh@company.com' },
          { _id: '2', name: 'Priya Sharma', email: 'priya@company.com' },
          { _id: '3', name: 'Amit Patel', email: 'amit@company.com' }
        ];
      }
    });
  }

  toggleExpand(leadId: string): void {
    this.expandedLeadId = this.expandedLeadId === leadId ? null : leadId;
  }

assignLead(leadId: string, employeeId: string): void {
  if (!employeeId) return;

  this.assigningLeadId = leadId;
  const assignUrl = `https://api.aadifintech.com/api/lead/assign/${leadId}`;

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.put(assignUrl, { employeeId }, { headers }).subscribe({
    next: (res: any) => {
      this.assigningLeadId = null;

      if (res.success) {
        this.successMessage = `Lead successfully assigned to ${res.lead?.assignTo?.name || 'employee'}!`;
        this.showSuccessPopup = true;
        setTimeout(() => this.showSuccessPopup = false, 3000);

        // ✅ Backend se fresh data lo — ab poori history bhi backend se hi aayegi
        this.fetchLeads(false);
      }
    },
    error: (err) => {
      console.error('Error assigning lead:', err);
      this.assigningLeadId = null;
      alert('Lead assign karne me error aayi. Console check karo.');
    }
  });
}


markLeadComplete(leadId: string): void {
  const completeUrl = `https://api.aadifintech.com/api/lead/update-status/${leadId}`;

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  this.http.put(completeUrl, { status: 'success' }, { headers }).subscribe({
    next: (res: any) => {
      this.successMessage = 'Lead marked as completed!';
      this.showSuccessPopup = true;
      setTimeout(() => this.showSuccessPopup = false, 3000);

      // ✅ Backend se fresh data lo
      this.fetchLeads(false);
    },
    error: (err) => {
      console.error('Error marking lead complete:', err);
      alert('Status update failed. Check karo ki role allowed hai (admin ya assigned employee).');
    }
  });
}

  getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    return `${day}/${month}/${year}`;
  }

  exportToPDF(): void {
    const printWindow = window.open('', '', 'height=800,width=1000');

    if (printWindow) {
      const tableContent = this.generatePDFTableContent();

      printWindow.document.write('<html><head><title>Leads Report</title>');
      printWindow.document.write(`
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; padding: 30px; background: #fff; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #dd3333; }
            h1 { color: #dd3333; font-size: 28px; margin-bottom: 10px; }
            .report-info { color: #666; font-size: 14px; margin-top: 8px; }
            .stats-row { display: flex; justify-content: center; gap: 30px; margin-top: 15px; }
            .stat-item { background: #f5f5f5; padding: 10px 20px; border-radius: 8px; font-weight: 600; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            th, td { border: 1px solid #ddd; padding: 14px 12px; text-align: left; font-size: 13px; }
            th { background: linear-gradient(135deg, #dd3333 0%, #ff4444 100%); color: white; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
            tr:nth-child(even) { background: #f9f9f9; }
            tr:hover { background: #f5f5f5; }
            .assigned-row { background: #e8f5e9 !important; }
            .assigned-badge { display: inline-block; background: #10b981; color: white; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0; text-align: center; color: #999; font-size: 12px; }
            .source-badge { display: inline-block; background: rgba(221, 51, 51, 0.1); color: #dd3333; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; }
            @media print { body { padding: 15px; } .no-print { display: none; } }
          </style>
        `);
      printWindow.document.write('</head><body>');
      printWindow.document.write('<div class="header">');
      printWindow.document.write('<h1>📊 Leads Management Report</h1>');
      printWindow.document.write('<p class="report-info">Generated on: ' + new Date().toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }) + '</p>');
      printWindow.document.write('<div class="stats-row">');
      printWindow.document.write('<div class="stat-item">Total Leads: ' + this.getTotalLeads() + '</div>');
      printWindow.document.write('<div class="stat-item">New Leads: ' + this.getNewLeads() + '</div>');
      printWindow.document.write('<div class="stat-item">Converted: ' + this.getConvertedLeads() + '</div>');
      printWindow.document.write('</div>');
      printWindow.document.write('</div>');
      printWindow.document.write(tableContent);
      printWindow.document.write('<div class="footer">© 2024 Aadi FinTech - Confidential Document</div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      setTimeout(() => { printWindow.print(); }, 250);
    }
  }

  generatePDFTableContent(): string {
    let tableHTML = '<table><thead><tr>';
    tableHTML += '<th>Lead Details</th>';
    tableHTML += '<th>Date & Time</th>';
    tableHTML += '<th>Source</th>';
    tableHTML += '<th>Notes</th>';
    tableHTML += '<th>Assignment</th>';
    tableHTML += '</tr></thead><tbody>';

    this.sortLeadsData().forEach(lead => {
      const assignedClass = lead.assignTo ? 'assigned-row' : '';
      tableHTML += `<tr class="${assignedClass}">`;

      tableHTML += '<td>';
      tableHTML += `<strong>${lead.leadName}</strong><br>`;
      tableHTML += `📞 ${lead.leadPhone}`;
      if (lead.leadEmail) {
        tableHTML += `<br>📧 ${lead.leadEmail}`;
      }
      tableHTML += '</td>';

      tableHTML += `<td>${lead.submittedDate}<br><small style="color:#999"></small></td>`;
      tableHTML += `<td><span class="source-badge">${lead.leadSource}</span></td>`;
      tableHTML += `<td>${lead.notes || '-'}</td>`;

      tableHTML += '<td>';
      if (lead.assignTo) {
        tableHTML += `<span class="assigned-badge">✓ ${lead.assignTo.name}</span>`;
        if (lead.assignedDate) {
          tableHTML += `<br><small style="color:#666">📅 ${lead.assignedDate}</small>`;
        }
      } else {
        tableHTML += '<span style="color:#999">Not Assigned</span>';
      }
      tableHTML += '</td>';

      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';
    return tableHTML;
  }

  getLeadSourceIcon(source: string): string {
    switch (source) {
      case 'Website': return 'fas fa-globe';
      case 'Google Ads': return 'fas fa-search';
      case 'Social Media': return 'fas fa-share-alt';
      case 'Referral': return 'fas fa-user-friends';
      case 'Email Campaign': return 'fas fa-envelope';
      case 'LinkedIn': return 'fas fa-linkedin';
      default: return 'fas fa-link';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'New': return 'badge-new';
      case 'Contacted': return 'badge-contacted';
      case 'Qualified': return 'badge-qualified';
      case 'Converted': return 'badge-converted';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'New': return 'fas fa-star';
      case 'Contacted': return 'fas fa-phone';
      case 'Qualified': return 'fas fa-check-circle';
      case 'Converted': return 'fas fa-trophy';
      default: return 'fas fa-question-circle';
    }
  }

  getTotalLeads(): number {
    return this.leadsData.length;
  }

  getNewLeads(): number {
    return this.leadsData.filter(lead => lead.leadStatus === 'New').length;
  }

  getConvertedLeads(): number {
    return this.leadsData.filter(lead => lead.leadStatus === 'Converted').length;
  }

  filterLeadsData(): LeadRecord[] {
    if (!this.searchQuery) return this.leadsData;
    return this.leadsData.filter(record =>
      record.leadName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (record.leadEmail || '').toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      record.leadPhone.includes(this.searchQuery)
    );
  }

  sortLeadsData(): LeadRecord[] {
    const filtered = this.filterLeadsData();
    return filtered.sort((a, b) => {
      if (this.sortBy === 'date') {
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      } else if (this.sortBy === 'name') {
        return a.leadName.localeCompare(b.leadName);
      } else if (this.sortBy === 'status') {
        return (a.leadStatus || '').localeCompare(b.leadStatus || '');
      }
      return 0;
    });
  }

  getPaginatedLeads(): LeadRecord[] {
    const sorted = this.sortLeadsData();
    const startIndex = (this.currentPage - 1) * this.leadsPerPage;
    return sorted.slice(startIndex, startIndex + this.leadsPerPage);
  }

  getTotalPages(): number {
    return Math.ceil(this.sortLeadsData().length / this.leadsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.getTotalPages() }, (_, i) => i + 1);
  }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }

  openDeleteConfirm(leadId: string): void {
    this.leadToDelete = leadId;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm(): void {
    this.showDeleteConfirm = false;
    this.leadToDelete = null;
  }

  confirmDelete(): void {
    if (this.leadToDelete) {
      this.deleteLead(this.leadToDelete);
    }
    this.closeDeleteConfirm();
  }

  deleteLead(leadId: string): void {
    const deleteUrl = `https://api.aadifintech.com/api/lead/delete/${leadId}`;

    this.isDeleting = true;
    const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    this.http.delete(deleteUrl, { headers }).subscribe({
      next: (res: any) => {
        this.leadsData = this.leadsData.filter(lead => lead._id !== leadId);
        this.successMessage = 'Lead deleted successfully!';
        this.showSuccessPopup = true;
        setTimeout(() => (this.showSuccessPopup = false), 3000);
      },
      error: (err) => {
        console.error('Error deleting lead:', err);
        if (err.status === 403) {
          alert('❌ Only admins can delete leads!');
        } else {
          alert('Failed to delete lead.');
        }
      }
    });
  }

  exportToExcel(): void {
    const data = this.sortLeadsData();

    const excelData = data.map(lead => ({
      'Lead Name': lead.leadName,
      'Phone': lead.leadPhone,
      'Email': lead.leadEmail || '-',
      'Date': lead.submittedDate,
      'Time': lead.submittedTime,
      'Source': lead.leadSource,
      'Notes': lead.notes || '-',
      'Assigned To': lead.assignTo ? lead.assignTo.name : 'Not Assigned',
      'Assigned Date': lead.assignedDate || '-',
      'Job Status': lead.jobStatus || '-'
    }));

    const headers = Object.keys(excelData[0]).join(',');
    const rows = excelData.map(row =>
      Object.values(row).map(val => `"${val}"`).join(',')
    ).join('\n');

    const csv = `${headers}\n${rows}`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `Leads_Report_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  initTableScroll(): void {
    if (this.tableScrollBound) return;
    this.tableScrollBound = true;

    setTimeout(() => {
      const tableScroll = document.querySelector('.table-scroll') as HTMLElement;

      if (tableScroll) {
        tableScroll.addEventListener('mousedown', (e) => {
          this.isDragging = true;
          this.startX = e.pageX - tableScroll.offsetLeft;
          this.scrollLeft = tableScroll.scrollLeft;
          tableScroll.style.cursor = 'grabbing';
        });

        tableScroll.addEventListener('mouseleave', () => {
          this.isDragging = false;
          tableScroll.style.cursor = 'grab';
        });

        tableScroll.addEventListener('mouseup', () => {
          this.isDragging = false;
          tableScroll.style.cursor = 'grab';
        });

        tableScroll.addEventListener('mousemove', (e) => {
          if (!this.isDragging) return;
          e.preventDefault();
          const x = e.pageX - tableScroll.offsetLeft;
          const walk = (x - this.startX) * 2;
          tableScroll.scrollLeft = this.scrollLeft - walk;
        });

        let touchStartX = 0;
        let touchScrollLeft = 0;

        tableScroll.addEventListener('touchstart', (e) => {
          touchStartX = e.touches[0].pageX - tableScroll.offsetLeft;
          touchScrollLeft = tableScroll.scrollLeft;
        });

        tableScroll.addEventListener('touchmove', (e) => {
          const x = e.touches[0].pageX - tableScroll.offsetLeft;
          const walk = (x - touchStartX) * 2;
          tableScroll.scrollLeft = touchScrollLeft - walk;
        });
      }
    }, 100);
  }
}