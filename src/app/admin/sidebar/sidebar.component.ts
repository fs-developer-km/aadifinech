import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  submenu?: MenuItem[];
  routerLink?: string;
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
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: 0
      })),
      state('expanded', style({
        height: '*',
        overflow: 'visible',
        opacity: 1
      })),
      transition('collapsed => expanded', [
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ]),
      transition('expanded => collapsed', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('rotate', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      transition('collapsed <=> expanded', animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isSidebarOpen: boolean = true;
  @Output() isSidebarOpenChange = new EventEmitter<boolean>();

  private readonly MOBILE_BREAKPOINT = 992;
  private resizeTimeout: any;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: '📊', routerLink: '/', expanded: false },
    {
      label: 'User Table',
      icon: '👥',
      submenu: [{ label: 'User Login', icon: '🔑', routerLink: '/admin/userlogin' }],
      expanded: false
    }
  ];

  ngOnInit() {
    this.checkScreenSize();
  }

  ngOnDestroy() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
  }

  // ✅ Listen to window resize events
  @HostListener('window:resize')
  onResize() {
    if (this.resizeTimeout) clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => this.checkScreenSize(), 150);
  }

  // ✅ Ensure sidebar closes on mobile, opens on desktop
 private checkScreenSize() {
  const isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;

  if (isMobile) {
    this.isSidebarOpen = false; // ✅ closed by default on mobile
    document.body.classList.add('collapsed');
  } else {
    this.isSidebarOpen = true; // ✅ open on desktop
    document.body.classList.remove('collapsed');
  }

  this.isSidebarOpenChange.emit(this.isSidebarOpen);
}


  toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
  this.isSidebarOpenChange.emit(this.isSidebarOpen);
  document.body.classList.toggle('collapsed', !this.isSidebarOpen);
}


  // ✅ Handle submenu toggle
  toggleMenu(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  // ✅ Auto-close sidebar on menu click (mobile only)
  onClickMenu(item: MenuItem) {
    console.log('Clicked menu:', item.label, 'RouterLink:', item.routerLink);
    if (window.innerWidth <= this.MOBILE_BREAKPOINT && item.routerLink) {
      setTimeout(() => {
        this.isSidebarOpen = false;
        this.isSidebarOpenChange.emit(this.isSidebarOpen);
        document.body.classList.add('collapsed');
      }, 300);
    }
  }
}
