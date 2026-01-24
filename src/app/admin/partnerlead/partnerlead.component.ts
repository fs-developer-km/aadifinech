import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Partner {
  _id: string;
  name: string;
  mobile: string;
  isVerified: boolean;
  status: string;

  createdAt: string;   // ✅ ADD THIS
  updatedAt?: string;  // ✅ OPTIONAL
  verifiedAt?: string; // ✅ OPTIONAL

  adminRemarks?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Partner[];
}

@Component({
  selector: 'app-partnerlead',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './partnerlead.component.html',
  styleUrl: './partnerlead.component.css'
})
export class PartnerleadComponent implements OnInit {
  partners: Partner[] = [];
  filteredPartners: Partner[] = [];
  paginatedPartners: Partner[] = [];
  isLoading = true;
  searchQuery = '';

  // Modals
  showDetailsModal = false;
  showDeleteModal = false;
  showUpdateStatusModal = false;
  selectedPartner: Partner | null = null;
  partnerToDelete: Partner | null = null;
  partnerToUpdate: Partner | null = null;

  // Update status fields
  newStatus: string = '';
  adminRemarks: string = '';

  // Stats
  totalPartners = 0;
  pendingPartners = 0;
  approvedPartners = 0;
  rejectedPartners = 0;

  // Pagination
  currentPage = 1;
  itemsPerPage = 12; // Increased from 9 to show more cards
  totalPages = 0;
  pages: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPartners();
  }
  // this.http.get<ApiResponse>('http://localhost:5000/api/partner/partners')

  fetchPartners() {
    this.isLoading = true;
    this.http.get<ApiResponse>('https://api.aadifintech.com/api/partner/partners')
      .subscribe({
        next: (response) => {
          if (response.success) {



            this.partners = response.data;
            console.log("partners", this.partners);

            


          

       


            this.filteredPartners = [...this.partners];
            this.calculateStats();
            this.updatePagination();
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching partners:', error);
          this.isLoading = false;
        }
      });
  }

  getDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

getTime(dateStr: string): string {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}


  calculateStats() {
    this.totalPartners = this.partners.length;
    this.pendingPartners = this.partners.filter(p => p.status === 'Pending').length;
    this.approvedPartners = this.partners.filter(p => p.status === 'Approved').length;
    this.rejectedPartners = this.partners.filter(p => p.status === 'Rejected').length;
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredPartners = [...this.partners];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredPartners = this.partners.filter(partner =>
        partner.name.toLowerCase().includes(query) ||
        partner.mobile.includes(query)
      );
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredPartners.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPartners = this.filteredPartners.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }



  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'Approved': return 'status-approved';
      case 'Rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  }

  getInitials(name: string): string {
    if (!name) return 'N/A';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  // View Details Modal
  viewDetails(partner: Partner) {
    this.selectedPartner = partner;
    this.showDetailsModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedPartner = null;
    document.body.style.overflow = 'auto';
  }

  // Update Status Modal
  openUpdateStatusModal(partner: Partner) {
    this.partnerToUpdate = partner;
    this.newStatus = partner.status;
    this.adminRemarks = partner.adminRemarks || '';
    this.showUpdateStatusModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeUpdateStatusModal() {
    this.showUpdateStatusModal = false;
    this.partnerToUpdate = null;
    this.newStatus = '';
    this.adminRemarks = '';
    document.body.style.overflow = 'auto';
  }

  confirmUpdateStatus() {
    if (!this.partnerToUpdate || !this.newStatus) {
      alert('Please select a status');
      return;
    }

    // const url = `http://localhost:5000/api/partner/partners/${this.partnerToUpdate._id}`;
    const url = `https://api.aadifintech.com/api/partner/partners/${this.partnerToUpdate._id}`;

    const body = {
      status: this.newStatus,
      adminRemarks: this.adminRemarks
    };

    this.http.put(url, body).subscribe({
      next: (res: any) => {
        this.closeUpdateStatusModal();
        this.fetchPartners();
        this.showSuccessToast('Partner status updated successfully');
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || "Error updating partner status");
        this.closeUpdateStatusModal();
      }
    });
  }

  // Delete Confirmation Modal
  confirmDelete(partner: Partner) {
    this.partnerToDelete = partner;
    this.showDeleteModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.partnerToDelete = null;
    document.body.style.overflow = 'auto';
  }

  confirmDeleteAction() {
    if (!this.partnerToDelete) return;

    // const url = `http://localhost:5000/api/partner/partners/${this.partnerToDelete._id}`;
    const url = `https://api.aadifintech.com/api/partner/partners/${this.partnerToDelete._id}`;

    this.http.delete(url).subscribe({
      next: (res: any) => {
        this.closeDeleteModal();
        this.fetchPartners();
        this.showSuccessToast('Partner deleted successfully');
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || "Error deleting partner");
        this.closeDeleteModal();
      }
    });
  }

  showSuccessToast(message: string) {
    alert(message);
  }
}