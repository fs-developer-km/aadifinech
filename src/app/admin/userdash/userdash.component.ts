import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

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
  selector: 'app-userdash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdash.component.html',
  styleUrls: ['./userdash.component.css']
})
export class UserdashComponent implements OnInit {

  userName = '';
  userPhone = '';
  userInitials = '';

  companyPhone = '+911234567890';
  companyWhatsApp = '911234567890';

  userLoginData: UserLoginRecord[] = [];
  loading = true;

  constructor(private router: Router, private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(showLoader = true): void {
    if (showLoader) this.loading = true;
    this.userService.getUserLoginRecords().subscribe({
      next: (data) => {
        this.userLoginData = data;
        if (data.length > 0) {
          this.userName = data[0].userName;
          this.userPhone = data[0].userPhone;
          this.setUserInitials();
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user data:', err);
        this.loading = false;
      }
    });
  }

  setUserInitials(): void {
    if (!this.userName) {
      this.userInitials = '';
      return;
    }
    const names = this.userName.split(' ');
    this.userInitials = names.map(name => name.charAt(0).toUpperCase()).join('');
  }

  callNow(): void {
    window.location.href = `tel:${this.companyPhone}`;
  }

  openWhatsApp(): void {
    const message = encodeURIComponent(
      `Hello AadiFintech Team,\n\nI am ${this.userName} (${this.userPhone}).\n\nI am interested in exploring loan and finance options. I would like to discuss:\n\n• Personal Loan\n• Business Loan\n• Home Loan\n\nPlease contact me at your earliest convenience.\n\nThank you!`
    );
    const whatsappUrl = `https://wa.me/${this.companyWhatsApp}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
