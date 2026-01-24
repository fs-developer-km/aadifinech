import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, TopbarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  
  isSidebarOpen: boolean = true;
  isUserDash: boolean = false;
  
  private routerSubscription?: Subscription;

  constructor(private router: Router) {
    // Route change detect karo
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isUserDash = event.url.includes('/admin/userdash');
        
        // Force scroll reset on route change
        setTimeout(() => {
          this.resetScroll();
        }, 0);
      });
  }

  ngOnInit(): void {
    // Initial load pe scroll ensure karo
    setTimeout(() => {
      this.resetScroll();
      this.forceReflow();
    }, 100);
  }

  ngOnDestroy(): void {
    // Memory leak prevent karo
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('✅ Layout - Sidebar state:', this.isSidebarOpen);
    
    // Sidebar toggle pe layout recalculate karo
    setTimeout(() => {
      this.forceReflow();
    }, 50);
  }

  private resetScroll(): void {
    // Scroll position reset karo
    const contentArea = document.querySelector('.content-area') as HTMLElement;
    const userDashContainer = document.querySelector('.userdash-container') as HTMLElement;
    
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
    
    if (userDashContainer) {
      userDashContainer.scrollTop = 0;
    }
  }

  private forceReflow(): void {
    // Browser ko layout recalculate karne pe force karo
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    const contentArea = document.querySelector('.content-area') as HTMLElement;
    
    if (mainContent) {
      mainContent.style.display = 'none';
      void mainContent.offsetHeight; // Force reflow
      mainContent.style.display = '';
    }
    
    if (contentArea) {
      contentArea.style.overflow = 'hidden';
      void contentArea.offsetHeight; // Force reflow
      contentArea.style.overflow = '';
    }
  }
}