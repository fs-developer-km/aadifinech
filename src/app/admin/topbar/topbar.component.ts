import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { PageTrackerService } from '../../core/services/page-tracker.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css'],
  animations: [
    trigger('dropdownAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-15px) scale(0.9)' }),
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)'
        }))
      ]),
      transition(':leave', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'translateY(-15px) scale(0.9)'
        }))
      ])
    ])
  ]
})
export class TopbarComponent implements OnInit {

  // 🔹 Notification counts
  notificationsCount = 0;
  messagesCount = 0;

  // 🔹 Logged-in admin
  user: any = null;

  // 🔹 Profile dropdown control
  isProfileDropdownOpen = false;

  // 🔹 Profile info displayed in dropdown
  userProfile = {
    name: 'Loading...----',
    email: 'Loading...',
    avatar: '👤'
  };

  // 🔹 Profile menu items
  profileMenuItems = [
    {
      label: 'My Profile',
      icon: '👤',
      action: 'profile',
      description: 'View and edit your profile'
    },
    {
      label: 'Account Settings',
      icon: '⚙️',
      action: 'settings',
      description: 'Manage account settings'
    },
    {
      label: 'Billing',
      icon: '💳',
      action: 'billing',
      description: 'View your payment history'
    },
    {
      label: 'Help Center',
      icon: '❓',
      action: 'help',
      description: 'Get support or FAQs'
    },
    {
      label: 'Logout',
      icon: '🚪',
      action: 'logout',
      description: 'Sign out from your account'
    }
  ];

  // Sidebar toggle bindings
  @Input() isSidebarOpen: boolean = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private pageTracker: PageTrackerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Load logged-in user info
    const user = this.authService.getUser();
    if (user) {
      this.userProfile = {
        name: user.name || 'Administrator',
        email: user.mobile || 'mobile',
        avatar: this.generateAvatar(user.name || 'A')
      };
    }

    // ✅ Listen for notifications & messages
    this.pageTracker.notifications$.subscribe(list => {
      this.notificationsCount = list.length;
    });

    this.pageTracker.messages$.subscribe(list => {
      this.messagesCount = list.length;
    });

    // ✅ Listen for real-time activities (lead/signup/login)
    this.pageTracker.newActivity$.subscribe(activity => {
      if (activity?.type) {
        this.notificationsCount++;
        this.messagesCount++;
      }
    });
  }

  // 🔹 Generate avatar initial from name
  private generateAvatar(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '👤';
  }

  // 🔹 Sidebar toggle
  onToggle() {
     console.log('🔥 Toggle clicked! isSidebarOpen:', this.isSidebarOpen);
    this.toggleSidebar.emit();
  }

  // 🔹 Open/close profile dropdown
  toggleProfileDropdown(): void {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  // 🔹 Menu item click actions
// onProfileMenuClick(action: string): void {
//   console.log('Profile menu clicked:', action);
//   this.closeProfileDropdown();

//   switch (action) {
//     case 'profile':
//       // Navigate to profile page
//       this.router.navigate(['/profile']);
//       break;

//     case 'settings':
//       // Navigate to settings page
//       this.router.navigate(['/settings']);
//       break;

//     case 'billing':
//       // Navigate to billing page
//       this.router.navigate(['/billing']);
//       break;

//     case 'help':
//       // Navigate to help/support page
//       this.router.navigate(['/help']);
//       break;

//     case 'logout':
//       // Clear token & user
//       this.authService.logout();
//       this.authService.clearUser();

//       // Navigate to login page
//       this.router.navigate(['/login']);
//       console.log('Logged out successfully.');
//       break;

//     default:
//       console.warn('Unknown action:', action);
//   }
// }


 // 🔹 Logout loader state
  isLoggingOut = false;

  // ... existing code ...

  onProfileMenuClick(action: string): void {
    this.closeProfileDropdown();

    switch (action) {
      case 'profile':
        console.log('Profile clicked');
        // this.router.navigate(['/profile']);
        break;

      case 'settings':
        console.log('Settings clicked');
        // this.router.navigate(['/settings']);
        break;

      case 'help':
        console.log('Help clicked');
        // this.router.navigate(['/help']);
        break;

      case 'logout':
        this.handleLogout();
        break;

      default:
        console.warn('Unknown action:', action);
    }
  }

  // 🔹 Handle Logout with Loader
  handleLogout(): void {
    // Show loader
    this.isLoggingOut = true;

    // Simulate logout process (minimum 1.5 seconds for better UX)
    setTimeout(() => {
      // Clear token & user
      this.authService.isLoggedInn();
      this.authService.clearUser();

      // Navigate to home page
      this.router.navigate(['/']).then(() => {
        // Hide loader after navigation
        this.isLoggingOut = false;
        console.log('Logged out successfully.');
      });
    }, 1500); // 1.5 second delay for smooth logout experience
  }


}
