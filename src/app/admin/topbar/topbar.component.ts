import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  
  @Input() isSidebarOpen: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  // User Profile Data
  userProfile = {
    name: 'Admin User',
    email: 'admin@aadifintech.com',
    avatar: 'A',
    role: 'Administrator'
  };

  // Search
  searchQuery: string = '';

  // Notifications & Messages
  notificationsCount: number = 3;
  messagesCount: number = 5;

  // Dropdown State
  isProfileDropdownOpen: boolean = false;

  // Logout State
  isLoggingOut: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Load user data from auth service
    const user = this.authService.getUser();
    console.log("user get for email",user);
    
    if (user) {
      this.userProfile.name = user.name || 'Admin User';
      this.userProfile.email = user.mobile || 'admin@aadifintech.com';
      this.userProfile.avatar = user.name ? user.name.charAt(0).toUpperCase() : 'A';
      this.userProfile.role = user.role || 'Administrator';
    }
  }

  // Toggle Sidebar
  onToggle() {
    this.toggleSidebar.emit();
    console.log('📍 Topbar toggle clicked');
  }

  // Search Function
  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('🔍 Searching for:', this.searchQuery);
      // Implement your search logic here
      // this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  // Profile Dropdown
  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    console.log('👤 Profile dropdown:', this.isProfileDropdownOpen);
  }

  closeProfileDropdown() {
    this.isProfileDropdownOpen = false;
  }

  // Profile Menu Click Handler
  onProfileMenuClick(action: string) {
    console.log('🎯 Profile menu action:', action);

    switch (action) {
      case 'logout':
        this.logout();
        break;
      default:
        console.log('Unknown action:', action);
    }
  }

  // Logout Function
  logout() {
    this.isLoggingOut = true;
    this.closeProfileDropdown();

    console.log('🚪 Logging out...');

    // Simulate API call delay
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
      this.isLoggingOut = false;
      console.log('✅ Logout complete');
    }, 2000);
  }

  // Notification Click
  onNotificationClick() {
    console.log('🔔 Notifications clicked');
    // Navigate to notifications page or open modal
    // this.router.navigate(['/notifications']);
  }

  // Messages Click
  onMessagesClick() {
    console.log('💬 Messages clicked');
    // Navigate to messages page or open modal
    // this.router.navigate(['/messages']);
  }

  // Settings Click
  onSettingsClick() {
    console.log('⚙️ Settings clicked');
    // Navigate to settings page
    // this.router.navigate(['/settings']);
  }
}