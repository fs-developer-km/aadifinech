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

interface LeadCard {
  leadName: string;
  leadPhone: string;
  leadSource: string;
  notes: string;
  submittedDate: string;
  submittedTime: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginCard {
  userName: string;
  userEmail: string;
  userPhone: string;
  accountStatus: string;
  signupDate: string;
  lastLoginDate: string;
  lastLoginTime: string;
  location: string;
  loginCount: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Sidebar and User Info
  sidebarOpen = false;
  currentUser = 'John Doe';
  currentUserRole = 'Administrator';
  
  // Statistics
  totalVisitors = 0;
  totalUsers = 0;
  totalLeads = 0;
  grandTotal = 0;
  
  // Loading States
  loadingLeads = true;
  loadingLogins = true;
  loadingProjects = false;

  // Popup States
  showLeadPopup = false;
  showLoginPopup = false;
  showProjectPopup = false;
  
  selectedLead: LeadCard | null = null;
  selectedLogin: LoginCard | null = null;
  selectedProject: ProjectCard | null = null;
  
  // Mobile Breakpoint
  private readonly MOBILE_BREAKPOINT = 992;

  // User Profile
  userProfile = {
    name: 'Loading...',
    email: 'Loading...',
    avatar: '👤'
  };

  // Dashboard Stats (Optional)
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

  // Active Projects Data
  activeProjects: ProjectCard[] = [
    { projectName: 'Web Development', projectProgress: 75 },
    { projectName: 'Mobile App', projectProgress: 60 },
    { projectName: 'UI/UX Design', projectProgress: 90 },
    { projectName: 'Marketing Campaign', projectProgress: 45 },
    { projectName: 'SEO Optimization', projectProgress: 85 },
    { projectName: 'Content Writing', projectProgress: 55 }
  ];

  // Separate arrays for Leads and Logins
  recentLeads: LeadCard[] = [];
  recentLogins: LoginCard[] = [];

  constructor(
    private visitorDataService: PageTrackerService, 
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // Check initial screen size
    this.checkScreenSize();

    // Load user profile
    this.loadUserProfile();

    // Add notifications
    this.addInitialNotifications();

    // Load dashboard statistics
    this.loadDashboardStatistics();

    // Load recent data
    this.loadRecentActivities();
  }

  // ========================================
  // INITIALIZATION METHODS
  // ========================================

  private loadUserProfile(): void {
    const user = this.authService.getUser();
    if (user) {
      this.userProfile = {
        name: user.name || 'Administrator',
        email: user.mobile || user.email || 'N/A',
        avatar: this.generateAvatar(user.name || 'A')
      };
    }
  }

  private addInitialNotifications(): void {
    this.visitorDataService.addNotification({
      title: 'New Lead Added',
      message: 'A new user submitted a lead form.',
      time: new Date().toLocaleString()
    });

    this.visitorDataService.addMessage({
      from: 'Admin Panel',
      text: 'User logged in successfully!',
      time: new Date().toLocaleString()
    });
  }

  private loadDashboardStatistics(): void {
    // Fetch visitor and user data
    this.visitorDataService.loadAllVisitors();
    this.visitorDataService.loadAllUsers();

    // Subscribe to all statistics
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

  // ========================================
  // LOAD RECENT ACTIVITIES - SEPARATE
  // ========================================

  loadRecentActivities(): void {
    this.loadingLeads = true;
    this.loadingLogins = true;
    
    combineLatest([
      this.authService.getLeads(),
      this.authService.getUserLoginRecords()
    ]).subscribe({
      next: ([leadsRes, loginsRes]: [any, any]) => {
        console.log('📢 Raw Leads Response:', leadsRes);
        console.log('📢 Raw Logins Response:', loginsRes);

        // Extract leads array
        const leads = Array.isArray(leadsRes)
          ? leadsRes
          : (leadsRes?.leads || leadsRes?.data || []);

        // Extract logins array
        const logins = Array.isArray(loginsRes)
          ? loginsRes
          : (loginsRes?.records || loginsRes?.data || []);

        // Sort leads by date (latest first)
        const sortedLeads = leads.sort((a: any, b: any) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );

        // Sort logins by date (latest first)
        const sortedLogins = logins.sort((a: any, b: any) => {
          const dateA = new Date(a.signupDate || a.lastLoginDate || 0).getTime();
          const dateB = new Date(b.signupDate || b.lastLoginDate || 0).getTime();
          return dateB - dateA;
        });

        // Map leads to LeadCard format (latest 3)
        this.recentLeads = sortedLeads.slice(0, 3).map((lead: any) => ({
          leadName: lead.leadName || 'Unknown Lead',
          leadPhone: lead.leadPhone || 'N/A',
          leadSource: lead.leadSource || 'N/A',
          notes: lead.notes || 'No notes available',
          submittedDate: lead.submittedDate || 'N/A',
          submittedTime: lead.submittedTime || '',
          createdAt: this.formatDate(lead.createdAt),
          updatedAt: this.formatDate(lead.updatedAt)
        }));

        // Map logins to LoginCard format (latest 3)
        this.recentLogins = sortedLogins.slice(0, 3).map((login: any) => ({
          userName: login.userName || 'Unknown User',
          userEmail: login.userEmail || 'N/A',
          userPhone: login.userPhone || 'N/A',
          accountStatus: login.accountStatus || 'Active',
          signupDate: login.signupDate || 'N/A',
          lastLoginDate: login.lastLoginDate || 'N/A',
          lastLoginTime: login.lastLoginTime || '',
          location: login.location || 'Unknown Location',
          loginCount: login.loginCount || 0
        }));

        console.log('🔥 Recent Leads:', this.recentLeads);
        console.log('🔥 Recent Logins:', this.recentLogins);
        
        // Stop loading
        this.loadingLeads = false;
        this.loadingLogins = false;
      },
      error: (err) => {
        console.error('❌ Error loading activities:', err);
        this.loadingLeads = false;
        this.loadingLogins = false;
        this.recentLeads = [];
        this.recentLogins = [];
      }
    });
  }

  // ========================================
  // POPUP METHODS - LEAD
  // ========================================

  openLeadDetails(lead: LeadCard): void {
    this.selectedLead = lead;
    this.showLeadPopup = true;
    document.body.style.overflow = 'hidden';
    console.log('🔍 Opening Lead Details:', lead);
  }

  closeLeadPopup(): void {
    this.showLeadPopup = false;
    this.selectedLead = null;
    document.body.style.overflow = 'auto';
  }

  deleteLead(lead: LeadCard): void {
    if (confirm(`Are you sure you want to delete lead: ${lead.leadName}?`)) {
      console.log('🗑️ Deleting lead:', lead);
      // Add your delete logic here
      // this.authService.deleteLead(lead.id).subscribe(...)
    }
  }

  // ========================================
  // POPUP METHODS - LOGIN
  // ========================================

  openLoginDetails(login: LoginCard): void {
    this.selectedLogin = login;
    this.showLoginPopup = true;
    document.body.style.overflow = 'hidden';
    console.log('🔍 Opening Login Details:', login);
  }

  closeLoginPopup(): void {
    this.showLoginPopup = false;
    this.selectedLogin = null;
    document.body.style.overflow = 'auto';
  }

  deleteLogin(login: LoginCard): void {
    if (confirm(`Are you sure you want to delete login record: ${login.userName}?`)) {
      console.log('🗑️ Deleting login:', login);
      // Add your delete logic here
      // this.authService.deleteLoginRecord(login.id).subscribe(...)
    }
  }

  // ========================================
  // POPUP METHODS - PROJECT (COMING SOON)
  // ========================================

  openProjectDetails(project: ProjectCard): void {
    this.selectedProject = project;
    this.showProjectPopup = true;
    document.body.style.overflow = 'hidden';
    console.log('🔍 Opening Project Details (Coming Soon):', project);
  }

  closeProjectPopup(): void {
    this.showProjectPopup = false;
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  // ========================================
  // UTILITY METHODS
  // ========================================

  getInitials(name: string): string {
    if (!name || name === 'N/A') return '??';
    
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  private formatDate(date: any): string {
    if (!date) return 'N/A';
    
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'N/A';
      
      return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  }

  private generateAvatar(name: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '👤';
  }

  getChangeStatusClass(status: boolean): string {
    return status ? 'positive-change' : 'negative-change';
  }

  // ========================================
  // RESPONSIVE METHODS
  // ========================================

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    
    if (width <= this.MOBILE_BREAKPOINT) {
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = false;
    }
  }

  toggleNavigationSidebar(): void {
    if (window.innerWidth <= this.MOBILE_BREAKPOINT) {
      this.sidebarOpen = !this.sidebarOpen;
      
      if (this.sidebarOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  // ========================================
  // OPTIONAL: REFRESH METHODS
  // ========================================

  refreshLeads(): void {
    this.loadRecentActivities();
  }

  refreshLogins(): void {
    this.loadRecentActivities();
  }

  refreshProjects(): void {
    this.loadingProjects = true;
    setTimeout(() => {
      this.loadingProjects = false;
    }, 1000);
  }
}