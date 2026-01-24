import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface UserData {
  id: string;
  name: string;
  mobile: string;
  role: string;
  accountStatus: string;
  signupDate: string;
  lastLoginDate?: string;
  lastLoginTime?: string;
  loginCount?: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  user: UserData | null = null;
  loading = true;
  error: string = '';
  currentTime = new Date();

  // ✅ Update your API base URL here
  // private apiUrl = 'http://localhost:5000/api/auth';
  private apiUrl = 'https://api.aadifintech.com/api/auth';

  // ✅ Updated Contact details
  supportPhone = '9953655610';
  supportWhatsApp = '9953655610';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUserData();
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  loadUserData() {
    const token = localStorage.getItem('token');
    const userId = this.getUserIdFromToken(token);

    if (!userId || !token) {
      this.error = 'Please login to view your dashboard';
      this.loading = false;
      return;
    }

    // ✅ NEW API ENDPOINT: /user/profile/:id
    this.http.get<any>(`${this.apiUrl}/user/profile/${userId}`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: (response) => {
        if (response.success) {
          this.user = response.data;
          console.log('✅ User data loaded:', this.user);
        } else {
          this.error = response.msg || 'Failed to load user data';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading user:', err);
        this.error = err.error?.msg || 'Failed to load user data';
        this.loading = false;
        
        // If unauthorized, clear token and redirect to login
        if (err.status === 401) {
          localStorage.removeItem('token');
          // You can add router navigation here
          // this.router.navigate(['/login']);
        }
      }
    });
  }

  getUserIdFromToken(token: string | null): string | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    } catch (error) {
      console.error('Invalid token format:', error);
      return null;
    }
  }

  getGreeting(): string {
    const hour = this.currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  openWhatsApp() {
    const message = encodeURIComponent(`Hello, I need support regarding my account. My name is ${this.user?.name || 'User'}`);
    window.open(`https://wa.me/91${this.supportWhatsApp}?text=${message}`, '_blank');
  }

  makeCall() {
    window.open(`tel:${this.supportPhone}`);
  }

  getDaysSinceSignup(): number {
    if (!this.user?.signupDate) return 0;
    const signup = new Date(this.user.signupDate);
    const now = new Date();
    const diff = now.getTime() - signup.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  // ✅ NEW: Offer-specific WhatsApp functions
  claimWelcomeBonus() {
    const message = encodeURIComponent(
      `Hi! I'm ${this.user?.name || 'User'} and I want to claim my Welcome Bonus (50% OFF) on my first transaction. My mobile: ${this.user?.mobile || ''}`
    );
    window.open(`https://wa.me/91${this.supportWhatsApp}?text=${message}`, '_blank');
  }

  shareReferral() {
    const message = encodeURIComponent(
      `Hi! I'm ${this.user?.name || 'User'} and I'm interested in the Refer & Earn program (₹500 Each). Please share details. My mobile: ${this.user?.mobile || ''}`
    );
    window.open(`https://wa.me/91${this.supportWhatsApp}?text=${message}`, '_blank');
  }

  upgradePlan() {
    const message = encodeURIComponent(
      `Hi! I'm ${this.user?.name || 'User'} and I want to upgrade to Premium Plan with 20% OFF. Please share details. My mobile: ${this.user?.mobile || ''}`
    );
    window.open(`https://wa.me/91${this.supportWhatsApp}?text=${message}`, '_blank');
  }

  // Optional: Logout function
  logout() {
    localStorage.removeItem('token');
    // Add router navigation to login page
    // this.router.navigate(['/login']);
  }
}