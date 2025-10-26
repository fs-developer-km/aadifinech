import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { PageTrackerService } from '../../core/services/page-tracker.service';

// 👇 Updated interface according to API data
interface CookieRecord {
  visitorId: string;
  ipAddress: string;
  pageVisited: string;
  sessionDuration: number;
  userAgent: string;
  visitDate: string;
  createdAt: string;
  updatedAt: string;
  status: 'Active' | 'Expired' | 'Disabled';
}

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {

  cookiesData: CookieRecord[] = [];
  searchQuery: string = '';
  sortBy: string = 'ip';
  filterType: string = 'all';
  loading: boolean = true;

  constructor(private cookieService: AuthService,private visitorDataService: PageTrackerService) {}

  ngOnInit(): void {
    this.loadCookiesData();

    
  }

  // 🔹 Load visitor cookies data
  loadCookiesData() {
    this.loading = true;
    this.cookieService.getAllCookies().subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log('✅ Raw API Response:', res);

        let cookiesArray: any[] = [];

        if (Array.isArray(res)) {
          cookiesArray = res;
        } else if (res.cookies) {
          cookiesArray = res.cookies;
        } else if (res.data) {
          cookiesArray = res.data;
        } else {
          console.warn('⚠️ No cookies data found in response.');
        }

        // 🔹 Map API response to UI data model
        this.cookiesData = cookiesArray.map((cookie: any, index: number) => ({
          visitorId: cookie.visitorId || `VIS-${index + 1}`,
          ipAddress: cookie.ipAddress || 'N/A',
          pageVisited: cookie.pageVisited || 'N/A',
          sessionDuration: cookie.sessionDuration ?? 0,
          userAgent: cookie.userAgent || 'Unknown Agent',
          visitDate: cookie.visitDate
            ? new Date(cookie.visitDate).toLocaleString()
            : '--',
          createdAt: cookie.createdAt
            ? new Date(cookie.createdAt).toLocaleString()
            : '--',
          updatedAt: cookie.updatedAt
            ? new Date(cookie.updatedAt).toLocaleString()
            : '--',
          status: cookie.status || 'Active'
        }));

             // ✅ Send live update to dashboard
      this.visitorDataService.updateTotalVisitors(this.cookiesData.length);


      console.log('✅ Mapped cookiesData:', this.cookiesData);

        console.log('✅ Mapped cookiesData:', this.cookiesData);
      },
      error: (err) => {
        this.loading = false;
        console.error('❌ Error fetching cookies:', err);
      }
    });
  }

  // 🔹 Delete one visitor record
  deleteCookie(index: number): void {
    const filteredData = this.sortCookiesData();
    const cookie = filteredData[index];

    if (confirm(`Are you sure you want to delete record ID: "${cookie.visitorId}"?`)) {
      this.cookieService.deleteCookie(cookie.visitorId).subscribe((res: any) => {
        if (res.success) {
          alert('Visitor deleted successfully');
          this.loadCookiesData();
        } else {
          alert('Failed to delete record');
        }
      });
    }
  }

  // 🔹 Clear all visitors (backend)
  clearAllCookies(): void {
    if (confirm('Are you sure you want to clear all visitor records?')) {
      this.cookieService.clearAllCookies().subscribe((res: any) => {
        if (res.success) {
          alert('All visitor records cleared');
          this.cookiesData = [];
        } else {
          alert('Failed to clear data');
        }
      });
    }
  }

  // 🔹 Search Filter
  filterCookiesData(): CookieRecord[] {
    let filtered = this.cookiesData;

    if (this.searchQuery) {
      filtered = filtered.filter(record =>
        record.ipAddress.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.pageVisited.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        record.userAgent.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    return filtered;
  }

  // 🔹 Sorting Function
  sortCookiesData(): CookieRecord[] {
    const filtered = this.filterCookiesData();
    return filtered.sort((a, b) => {
      if (this.sortBy === 'ip') {
        return a.ipAddress.localeCompare(b.ipAddress);
      } else if (this.sortBy === 'page') {
        return a.pageVisited.localeCompare(b.pageVisited);
      } else if (this.sortBy === 'session') {
        return b.sessionDuration - a.sessionDuration;
      } else if (this.sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });
  }

  // 🔹 Status Badge Style
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'badge-active';
      case 'Expired':
        return 'badge-expired';
      case 'Disabled':
        return 'badge-disabled';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active':
        return 'fas fa-check-circle';
      case 'Expired':
        return 'fas fa-times-circle';
      case 'Disabled':
        return 'fas fa-ban';
      default:
        return 'fas fa-question-circle';
    }
  }

  // 🔹 Dashboard summary
  getTotalVisitors(): number {
    return this.cookiesData.length;
  }

  getActiveVisitors(): number {
    return this.cookiesData.filter(cookie => cookie.status === 'Active').length;
  }

  getExpiredVisitors(): number {
    return this.cookiesData.filter(cookie => cookie.status === 'Expired').length;
  }
}
