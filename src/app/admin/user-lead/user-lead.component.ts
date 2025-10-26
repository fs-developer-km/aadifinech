import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PageTrackerService } from '../../core/services/page-tracker.service';

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
}

@Component({
  selector: 'app-user-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-lead.component.html',
  styleUrls: ['./user-lead.component.css']
})
export class UserLeadComponent implements OnInit {
  // Form data
  

   showForm = false;
  isLoading = false;
  message = '';
  messageType = '';

  newLeadForm = {
    leadName: '',
    leadPhone: ''
  };

    // ✅ Reactive data stream
  private leadsSubject = new BehaviorSubject<LeadRecord[]>([]);
  leadsData$ = this.leadsSubject.asObservable();

  leadsData: LeadRecord[] = [];
  searchQuery: string = '';
  sortBy: string = 'date';
  apiUrl = 'https://aadifintech-backend.onrender.com/api/lead/list';
    refreshInterval = 5000; // auto-refresh every 5 seconds (you can adjust)
  private refreshSub?: Subscription;

  constructor(private http: HttpClient, private pagetrackerService: PageTrackerService) {}

  ngOnInit(): void {
    this.fetchLeads();
  }

 
  submitLead() {
    if (!this.newLeadForm.leadName || !this.newLeadForm.leadPhone) {
      this.message = 'Please fill in all required fields.';
      this.messageType = 'error';
      return;
    }

    this.isLoading = true;
    this.message = '';

    const apiUrl = 'https://aadifintech-backend.onrender.com/api/lead/create';

    this.http.post(apiUrl, this.newLeadForm).subscribe({
      next: (res: any) => {
        this.isLoading = false;
   
        this.message = '✅ Lead submitted successfully!';
        this.messageType = 'success';

        // Reset form
        this.newLeadForm = { leadName: '', leadPhone: '' };

        // Auto close form after 2 sec
        setTimeout(() => {
          this.showForm = false;
          this.message = '';
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


  /** ✅ Fetch leads from backend API */
  fetchLeads(): void {
    this.isLoading = true;
    this.http.get<{ success: boolean; leads: LeadRecord[] }>(this.apiUrl).subscribe({
      next: (res) => {
        if (res.success && res.leads) {


          // Optional: add fallback status for safety
          this.leadsData = res.leads.map((lead, index) => ({
            ...lead,
            leadStatus: lead.leadStatus || 'New',
            leadId: lead.leadId || `#LEAD-${String(index + 1).padStart(3, '0')}`
          }));

           // 👇 Ye line se total count dashboard me bheja jayega
          this.pagetrackerService.updateTotalLeads(this.leadsData.length);
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leads:', err);
        this.isLoading = false;
      }
    });
  }

  /** ✅ Icons for source */
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

  /** ✅ Badge class for status */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'New': return 'badge-new';
      case 'Contacted': return 'badge-contacted';
      case 'Qualified': return 'badge-qualified';
      case 'Converted': return 'badge-converted';
      default: return '';
    }
  }

  /** ✅ Status icon */
  getStatusIcon(status: string): string {
    switch (status) {
      case 'New': return 'fas fa-star';
      case 'Contacted': return 'fas fa-phone';
      case 'Qualified': return 'fas fa-check-circle';
      case 'Converted': return 'fas fa-trophy';
      default: return 'fas fa-question-circle';
    }
  }

  /** ✅ Summary stats */
  getTotalLeads(): number {
    return this.leadsData.length;
  }

  getNewLeads(): number {
    return this.leadsData.filter(lead => lead.leadStatus === 'New').length;
  }

  getConvertedLeads(): number {
    return this.leadsData.filter(lead => lead.leadStatus === 'Converted').length;
  }

  /** ✅ Search + Sort system */
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

  /** ✅ Add new lead manually (optional form) */
  // submitLead(): void {
  //   if (this.newLeadForm.name && this.newLeadForm.phone && this.newLeadForm.email) {
  //     const now = new Date();
  //     const date = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  //     const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  //     const newLead: LeadRecord = {
  //       leadId: `#LEAD-${String(this.leadsData.length + 1).padStart(3, '0')}`,
  //       leadName: this.newLeadForm.name,
  //       leadPhone: this.newLeadForm.phone,
  //       leadEmail: this.newLeadForm.email,
  //       submittedDate: date,
  //       submittedTime: time,
  //       leadSource: 'Manual Add',
  //       leadStatus: 'New',
  //       notes: 'Manually added lead'
  //     };

  //     this.leadsData.unshift(newLead);
  //     this.newLeadForm = { name: '', phone: '', email: '' };
  //     this.showForm = false;

  //     alert('Lead submitted successfully!');
  //   } else {
  //     alert('Please fill all fields!');
  //   }
  // }

  toggleFormVisibility(): void {
    this.showForm = !this.showForm;
  }

  /** ✅ Delete a lead (frontend only) */
  deleteLead(index: number): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.leadsData.splice(index, 1);
    }
  }
}
