import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';  // ⭐ ADD THIS

interface MenuItem {
  label: string;
  icon: string;
  routerLink?: string;
  submenu?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideDown', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: 0 })),
      state('expanded', style({ height: '*', overflow: 'visible', opacity: 1 })),
      transition('collapsed => expanded', [animate('350ms ease')]),
      transition('expanded => collapsed', [animate('250ms ease')]),
    ]),
    trigger('rotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', animate('300ms ease'))
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() isSidebarOpen: boolean = true;
  @Output() isSidebarOpenChange = new EventEmitter<boolean>();

  private readonly MOBILE_BREAKPOINT = 992;
  private resizeTimeout: any;

  userRole: string = '';
  menuItems: MenuItem[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit() {
      this.userRole = this.authService.getUser()?.role;

    const user = this.authService.getUser();
    this.userRole = user?.role || '';

    this.menuItems = this.getMenuForRole();  // ⭐ Load menu dynamically
    this.checkScreenSize();                 // ⭐ Sidebar open/close logic
  }

  ngOnDestroy() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }

  // --------------------------------------------------------
  // ⭐ ROLE BASED MENU GENERATOR (MAIN LOGIC)
  // --------------------------------------------------------
  getMenuForRole(): MenuItem[] {
    switch (this.userRole) {

      case 'admin':
        return [
          { label: 'Dashboard', icon: '📊', routerLink: '/admin/dashboard' },
          { label: 'Cookies', icon: '🍪', routerLink: '/admin/cookies' },
          { label: 'User Table', icon: '👥', routerLink: '/admin/userlogin' },
          { label: 'User Lead', icon: '📑', routerLink: '/admin/userlead' },
          { label: 'Employee Management', icon: '🧑‍💼', routerLink: '/admin/usermgmt' }
        ];

      case 'employee':
        return [
          { label: 'Dashboard', icon: '🧑‍💻', routerLink: '/employee/dashboard' },
          { label: 'Assigned Leads', icon: '📝', routerLink: '/employee/assigned-leads' },
          { label: 'Attendance', icon: '⏱️', routerLink: '/employee/attendance' }
        ];

      case 'partner':
        return [
          { label: 'Dashboard', icon: '🤝', routerLink: '/partner/dashboard' },
          { label: 'Lead Status', icon: '📋', routerLink: '/partner/lead-status' },
          { label: 'Earnings', icon: '💰', routerLink: '/partner/earnings' }
        ];

      case 'user':
        return [
          { label: 'Dashboard', icon: '🏠', routerLink: '/user/dashboard' },
          { label: 'Profile', icon: '🪪', routerLink: '/user/profile' }
        ];

      default:
        return [];
    }
  }

  // --------------------------------------------------------
  // ⭐ Responsive behavior
  // --------------------------------------------------------
  @HostListener('window:resize')
  onResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.checkScreenSize(), 150);
  }

  private checkScreenSize() {
    const isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;

    this.isSidebarOpen = !isMobile;
    document.body.classList.toggle('collapsed', !this.isSidebarOpen);

    this.isSidebarOpenChange.emit(this.isSidebarOpen);
  }

  // --------------------------------------------------------
  // ⭐ Toggle Sidebar
  // --------------------------------------------------------
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    document.body.classList.toggle('collapsed', !this.isSidebarOpen);

    this.isSidebarOpenChange.emit(this.isSidebarOpen);
  }

  // --------------------------------------------------------
  // ⭐ Submenu toggle
  // --------------------------------------------------------
  toggleMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  // --------------------------------------------------------
  // ⭐ Auto close sidebar on mobile
  // --------------------------------------------------------
  onClickMenu(item: MenuItem) {
    if (window.innerWidth <= this.MOBILE_BREAKPOINT && item.routerLink) {
      setTimeout(() => {
        this.isSidebarOpen = false;
        document.body.classList.add('collapsed');
        this.isSidebarOpenChange.emit(this.isSidebarOpen);
      }, 200);
    }
  }
}
