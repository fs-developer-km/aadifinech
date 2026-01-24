import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface EmployeeData {
  _id: string;
  name: string;
  employeeCode?: string;
  department?: string;
  designation?: string;
  mobile?: string;
  accountStatus?: string;
}

interface PartnerData {
  _id: string;
  name: string;
  mobile: string;
  role: string;
  signupDate: string;
  lastLoginDate: string;
  lastLoginTime: string;
  loginCount: number;
  accountStatus: string;
  companyName: string;
  businessType: string;
  commissionType: string;
  commissionValue: number;
  gstNumber: string;
  address: string;
  assignedEmployee?: EmployeeData | string;
  assignedManager?: EmployeeData | string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: PartnerData;
}

@Component({
  selector: 'app-partner-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './partner-dashboard.component.html',
  styleUrl: './partner-dashboard.component.css'
})
export class PartnerDashboardComponent implements OnInit {
  partnerData: PartnerData | null = null;
  isLoading = true;
  currentTime = new Date();
  greeting = '';
  partnerId = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.setGreeting();
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userObj = JSON.parse(loggedInUser);
      this.partnerId = userObj.id;
      this.fetchPartnerData();
    }
    
    setInterval(() => {
      this.currentTime = new Date();
      this.setGreeting();
    }, 60000);
  }

  setGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  fetchPartnerData() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const url = `https://api.aadifintech.com/api/auth/profile/${this.partnerId}`;
    
    this.http.get<ApiResponse>(url, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.partnerData = response.data;
          
          console.log('✅ Partner Data Received:');
          console.log('Assigned Employee:', this.partnerData);
          console.log('Assigned Manager:', this.partnerData.assignedManager);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error fetching partner data:', error);
        this.isLoading = false;
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  getStatusClass(status: string): string {
    return status === 'Active' ? 'status-active' : 'status-inactive';
  }

  getStatusIcon(status: string): string {
    return status === 'Active' ? 'fa-check-circle' : 'fa-times-circle';
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  getDaysSinceRegistration(): number {
    if (!this.partnerData) return 0;
    const registrationDate = new Date(this.partnerData.signupDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - registrationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  formatCommissionValue(value: number): string {
    if (!value) return '₹0';
    if (value >= 10000000) {
      return '₹' + (value / 10000000).toFixed(2) + ' Cr';
    } else if (value >= 100000) {
      return '₹' + (value / 100000).toFixed(2) + ' L';
    } else if (value >= 1000) {
      return '₹' + (value / 1000).toFixed(2) + 'K';
    }
    return '₹' + value.toLocaleString('en-IN');
  }

  hasAssignedEmployee(): boolean {
    return !!(this.partnerData?.assignedEmployee && typeof this.partnerData.assignedEmployee === 'object');
  }

  hasAssignedManager(): boolean {
    return !!(this.partnerData?.assignedManager && typeof this.partnerData.assignedManager === 'object');
  }

  getEmployee(): EmployeeData | null {
    if (this.hasAssignedEmployee()) {
      return this.partnerData!.assignedEmployee as EmployeeData;
    }
    return null;
  }

  getManager(): EmployeeData | null {
    if (this.hasAssignedManager()) {
      return this.partnerData!.assignedManager as EmployeeData;
    }
    return null;
  }

  getEmployeeInitials(): string {
    const employee = this.getEmployee();
    return employee?.name ? this.getInitials(employee.name) : '?';
  }

  getManagerInitials(): string {
    const manager = this.getManager();
    return manager?.name ? this.getInitials(manager.name) : '?';
  }
}