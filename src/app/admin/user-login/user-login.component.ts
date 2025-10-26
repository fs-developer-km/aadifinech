import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { interval, Subscription } from 'rxjs';
import { PageTrackerService } from '../../core/services/page-tracker.service';

interface UserLoginRecord {
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  signupDate: string;
  lastLoginDate: string;
  lastLoginTime: string;
  loginCount: number;
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
  location: string;
}

@Component({
  selector: 'app-user-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{

  userLoginData: UserLoginRecord[] = [];
  sortBy: string = 'loginTime';
  searchQuery: string = '';
  loading = true; // loader flag
  refreshSub!: Subscription;

  
  constructor(private userService: AuthService, private visitorDataService: PageTrackerService) {}

  

  //  userLoginData: UserLoginRecord[] = [
  //   {
  //     userId: '#USR-001',
  //     userName: 'Rajesh Kumar',
  //     userPhone: '+91 98765 43210',
  //     userEmail: 'rajesh@example.com',
  //     signupDate: '15 Jan 2024',
  //     lastLoginDate: '18 Oct 2025',
  //     lastLoginTime: '08:30 AM',
  //     loginCount: 245,
  //     accountStatus: 'Active',
  //     location: 'Mumbai, India'
  //   }
  // ];

  // sortBy: string = 'loginTime';
  // searchQuery: string = '';

  ngOnInit(): void {
    this.loadUserData();
     // 👇 Har 10 second me data refresh hoga
    this.refreshSub = interval(10000).subscribe(() => {
      this.loadUserData(false); // false = loader mat dikhana
    });
  }

  
  ngOnDestroy(): void {
    // memory leak se bachne ke liye unsubscribe karna zaruri
    if (this.refreshSub) this.refreshSub.unsubscribe();
  }

   loadUserData(showLoader = true) {
    // this.loading = true;
      if (showLoader) this.loading = true;
    this.userService.getUserLoginRecords().subscribe({
      next: (data) => {
        this.userLoginData = data;
        this.visitorDataService.updateTotalUsers(this.userLoginData.length);
        

        console.log("user login data ",this.userLoginData);
        
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user data:', err);
        this.loading = false;
      }
    });
  }

   getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Active': return 'badge-active';
      case 'Inactive': return 'badge-inactive';
      case 'Suspended': return 'badge-suspended';
      default: return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active': return 'fas fa-check-circle';
      case 'Inactive': return 'fas fa-clock';
      case 'Suspended': return 'fas fa-ban';
      default: return 'fas fa-question-circle';
    }
  }

   filterLoginData(): UserLoginRecord[] {
    if (!this.searchQuery) return this.userLoginData;
    return this.userLoginData.filter(record =>
      record.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      record.userEmail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      record.userPhone.includes(this.searchQuery)
    );
  }

  sortLoginData(): UserLoginRecord[] {
    const filtered = this.filterLoginData();
    return filtered.sort((a, b) => {
      if (this.sortBy === 'loginTime') return b.loginCount - a.loginCount;
      return 0;
    });
  }

  // getStatusBadgeClass(status: string): string {
  //   switch (status) {
  //     case 'Active':
  //       return 'badge-active';
  //     case 'Inactive':
  //       return 'badge-inactive';
  //     case 'Suspended':
  //       return 'badge-suspended';
  //     default:
  //       return '';
  //   }
  // }

  // getStatusIcon(status: string): string {
  //   switch (status) {
  //     case 'Active':
  //       return 'fas fa-check-circle';
  //     case 'Inactive':
  //       return 'fas fa-clock';
  //     case 'Suspended':
  //       return 'fas fa-ban';
  //     default:
  //       return 'fas fa-question-circle';
  //   }
  // }

  // filterLoginData(): UserLoginRecord[] {
  //   if (!this.searchQuery) {
  //     return this.userLoginData;
  //   }
  //   return this.userLoginData.filter(record =>
  //     record.userName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //     record.userEmail.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //     record.userPhone.includes(this.searchQuery)
  //   );
  // }

  // sortLoginData(): UserLoginRecord[] {
  //   const filtered = this.filterLoginData();
  //   return filtered.sort((a, b) => {
  //     if (this.sortBy === 'loginTime') {
  //       return b.loginCount - a.loginCount;
  //     }
  //     return 0;
  //   });
  // }


}
