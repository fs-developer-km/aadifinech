import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { PageTrackerService } from '../../core/services/page-tracker.service';
import { combineLatest } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

interface DashboardStatCard {
  iconClass: string;
  cardTitle: string;
  cardValue: string | number;
  changeText: string;
  positiveChange: boolean;
}

interface ProjectCard {
  projectName: string;
  projectProgress: number;
}

interface ActivityCard {
  activityIcon: string;
  activityTitle: string;
  activityDescription: string;
  activityTime: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarOpen = false;
  currentUser = 'John Doe';
  currentUserRole = 'Administrator';
  totalVisitors = 0;
  totalUsers = 0;
  totalLeads = 0;
  grandTotal = 0;
  
  private readonly MOBILE_BREAKPOINT = 992;

  constructor(
    private visitorDataService: PageTrackerService, 
    private authService: AuthService
  ) { }

  dashboardStats: DashboardStatCard[] = [
    {
      iconClass: 'fas fa-users',
      cardTitle: 'Total Users',
      cardValue: '12,458',
      changeText: '12% from last month',
      positiveChange: true
    },
    {
      iconClass: 'fas fa-dollar-sign',
      cardTitle: 'Revenue',
      cardValue: '$89,542',
      changeText: '8% from last month',
      positiveChange: true
    },
    {
      iconClass: 'fas fa-shopping-cart',
      cardTitle: 'Orders',
      cardValue: '3,245',
      changeText: '3% from last month',
      positiveChange: false
    },
    {
      iconClass: 'fas fa-chart-line',
      cardTitle: 'Growth',
      cardValue: '45.2%',
      changeText: '15% from last month',
      positiveChange: true
    },
  ];

  activeProjects: ProjectCard[] = [
    { projectName: 'Web Development', projectProgress: 75 },
    { projectName: 'Mobile App', projectProgress: 60 },
    { projectName: 'UI/UX Design', projectProgress: 90 },
    { projectName: 'Marketing Campaign', projectProgress: 45 },
    { projectName: 'SEO Optimization', projectProgress: 85 },
    { projectName: 'Content Writing', projectProgress: 55 }
  ];

  userProfile = {
    name: 'Loading...----',
    email: 'Loading...',
    avatar: '👤'
  };

  recentActivities: any;

  ngOnInit(): void {
    // Check initial screen size
    this.checkScreenSize();

    // For profile dynamic name
    const user = this.authService.getUser();
    if (user) {
      this.userProfile = {
        name: user.name || 'Administrator',
        email: user.mobile || 'mobile',
        avatar: this.generateAvatar(user.name || 'A')
      };
    }

    this.visitorDataService.addNotification({
      title: 'New Lead Added',
      message: 'A new user submitted a lead form.',
      time: new Date().toLocaleString()
    });

    this.visitorDataService.addMessage({
      from: 'Admin Panel',
      text: 'User John logged in successfully!',
      time: new Date().toLocaleString()
    });

    this.loadRecentActivities();
    
    // Fetch data
    this.visitorDataService.loadAllVisitors();
    this.visitorDataService.loadAllUsers();

    // Subscribe to all three observables together
    combineLatest([
      this.visitorDataService.totalVisitors$,
      this.visitorDataService.totalUsers$,
      this.visitorDataService.totalLeads$
    ]).subscribe(([visitors, users, leads]) => {
      this.totalVisitors = visitors;
      this.totalUsers = users;
      this.totalLeads = leads;
      this.grandTotal = visitors + users + leads;
    });
  }

  // Listen to window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  // Check screen size and auto-close sidebar on mobile/tablet
  private checkScreenSize() {
    const width = window.innerWidth;
    
    if (width <= this.MOBILE_BREAKPOINT) {
      // Auto-close sidebar on mobile/tablet
      this.sidebarOpen = false;
    } else {
      // Desktop - sidebar always visible (no toggle needed)
      this.sidebarOpen = false; // Keep it false as we don't need toggle on desktop
    }
  }

  // Generate avatar initial from name
  private generateAvatar(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '👤';
  }

  // Toggle sidebar (only works on mobile/tablet)
  toggleNavigationSidebar(): void {
    if (window.innerWidth <= this.MOBILE_BREAKPOINT) {
      this.sidebarOpen = !this.sidebarOpen;
      
      // Prevent body scroll when sidebar is open
      if (this.sidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  getChangeStatusClass(status: boolean): string {
    return status ? 'positive-change' : 'negative-change';
  }

  // Load dynamic activities
  loadRecentActivities() {
    combineLatest([
      this.authService.getLeads(),
      this.authService.getUserLoginRecords()
    ]).subscribe({
      next: ([leadsRes, loginsRes]: [any, any]) => {
        console.log('📢 Raw Leads Response:', leadsRes);
        console.log('📢 Raw Logins Response:', loginsRes);

        // Leads array extract
        const leads = Array.isArray(leadsRes)
          ? leadsRes
          : (leadsRes?.leads || leadsRes?.data || []);

        // Logins array extract
        const logins = Array.isArray(loginsRes)
          ? loginsRes
          : (loginsRes?.records || loginsRes?.data || []);

        // Sort by date (latest first)
        const sortedLeads = leads.sort((a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const sortedLogins = logins.sort((a: any, b: any) => {
          const dateA = new Date(a.signupDate || a.lastLoginDate || 0).getTime();
          const dateB = new Date(b.signupDate || b.lastLoginDate || 0).getTime();
          return dateB - dateA;
        });

        // Latest 3 leads
        const latestLeads = sortedLeads.slice(0, 3).map((lead: any) => ({
          isLead: true,
          isLogin: false,
          activityIcon: 'fas fa-user-plus text-success',
          leadName: lead.leadName || 'Unknown Lead',
          leadPhone: lead.leadPhone || 'N/A',
          leadSource: lead.leadSource || 'N/A',
          notes: lead.notes || 'N/A',
          submittedDate: lead.submittedDate || 'N/A',
          submittedTime: lead.submittedTime || 'N/A',
          createdAt: this.formatDate(lead.createdAt),
          updatedAt: this.formatDate(lead.updatedAt),
          activityTime: lead.submittedDate
            ? `${lead.submittedDate} ${lead.submittedTime || ''}`
            : this.formatDate(lead.createdAt)
        }));

        // Latest 3 logins/signups
        const latestLogins = sortedLogins.slice(0, 3).map((login: any) => ({
          isLead: false,
          isLogin: true,
          activityIcon: 'fas fa-sign-in-alt text-primary',
          userName: login.userName || 'Unknown User',
          userEmail: login.userEmail || 'N/A',
          userPhone: login.userPhone || 'N/A',
          accountStatus: login.accountStatus || 'N/A',
          signupDate: login.signupDate || 'N/A',
          lastLoginDate: login.lastLoginDate || 'N/A',
          lastLoginTime: login.lastLoginTime || 'N/A',
          location: login.location || 'N/A',
          loginCount: login.loginCount || 0,
          activityTime: login.lastLoginDate !== 'N/A'
            ? `${login.lastLoginDate} ${login.lastLoginTime || ''}`
            : this.formatDate(new Date())
        }));

        // Merge (Leads first, then Logins)
        this.recentActivities = [...latestLeads, ...latestLogins];

        console.log('🔥 Final Merged Activities:', this.recentActivities);
      },
      error: err => console.error('❌ Error loading activities:', err)
    });
  }

  // Helper: Date formatting
  formatDate(date: any): string {
    const d = new Date(date);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}