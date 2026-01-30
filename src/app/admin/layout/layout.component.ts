import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  
  isSidebarOpen: boolean = true;
  isUserDash: boolean = false;
  
  private routerSubscription?: Subscription;
  private bodyStyleObserver?: MutationObserver;

  constructor(private router: Router) {
    // Route change detect karo
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isUserDash = event.url.includes('/admin/userdash');
        
        // Force scroll reset on route change
        setTimeout(() => {
          this.resetScroll();
          this.fixBodyOverflow(); // Fix overflow on route change
        }, 0);
      });
  }

  ngOnInit(): void {
    // Initial load pe body overflow fix karo
    this.fixBodyOverflow();
    
    // Watch for body style changes
    this.watchBodyStyles();
    
    // Initial scroll ensure karo
    setTimeout(() => {
      this.resetScroll();
      this.fixBodyOverflow();
    }, 100);
  }

  ngAfterViewInit(): void {
    // View load hone ke baad bhi fix karo
    setTimeout(() => {
      this.fixBodyOverflow();
      this.forceContentScroll();
    }, 200);
  }

  ngOnDestroy(): void {
    // Cleanup - Memory leak prevent karo
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    if (this.bodyStyleObserver) {
      this.bodyStyleObserver.disconnect();
    }
    
    // Body style reset karo
    document.body.style.overflow = '';
    document.body.style.overflowX = '';
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log('✅ Layout - Sidebar state:', this.isSidebarOpen);
    
    // Sidebar toggle pe layout recalculate karo
    setTimeout(() => {
      this.forceReflow();
      this.fixBodyOverflow(); // Ensure overflow stays fixed
    }, 50);
  }

  /**
   * ✅ CRITICAL FIX - Body Overflow ko Force Auto
   */
  private fixBodyOverflow(): void {
    const body = document.body;
    
    // Force body overflow to auto
    body.style.overflow = 'auto';
    body.style.overflowX = 'hidden';
    body.style.overflowY = 'auto';
    
    // Remove conflicting classes
    body.classList.remove('modal-open');
    
    console.log('🔧 Body overflow fixed:', {
      overflow: body.style.overflow,
      overflowX: body.style.overflowX,
      overflowY: body.style.overflowY
    });
  }

  /**
   * 👁️ Watch for body style changes and auto-fix them
   */
  private watchBodyStyles(): void {
    this.bodyStyleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const bodyStyle = document.body.style;
          
          // If overflow gets set to hidden, fix it immediately
          if (bodyStyle.overflow === 'hidden') {
            console.warn('⚠️ Body overflow was set to hidden - fixing...');
            this.fixBodyOverflow();
          }
        }
      });
    });

    // Start observing body element
    this.bodyStyleObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  /**
   * 📜 Force content-area to be scrollable
   */
  private forceContentScroll(): void {
    const contentArea = document.querySelector('.content-area') as HTMLElement;
    
    if (contentArea) {
      contentArea.style.overflowY = 'auto';
      contentArea.style.overflowX = 'hidden';
      
      console.log('📜 Content area scroll enabled:', {
        scrollHeight: contentArea.scrollHeight,
        clientHeight: contentArea.clientHeight,
        canScroll: contentArea.scrollHeight > contentArea.clientHeight
      });
    }
  }

  /**
   * 🔄 Reset scroll position
   */
  private resetScroll(): void {
    const contentArea = document.querySelector('.content-area') as HTMLElement;
    const userDashContainer = document.querySelector('.userdash-container') as HTMLElement;
    
    if (contentArea) {
      contentArea.scrollTop = 0;
    }
    
    if (userDashContainer) {
      userDashContainer.scrollTop = 0;
    }
  }

  /**
   * ⚡ Force browser reflow
   */
  private forceReflow(): void {
    const mainContent = document.querySelector('.main-content') as HTMLElement;
    const contentArea = document.querySelector('.content-area') as HTMLElement;
    
    if (mainContent) {
      mainContent.style.display = 'none';
      void mainContent.offsetHeight; // Force reflow
      mainContent.style.display = '';
    }
    
    if (contentArea) {
      const originalOverflow = contentArea.style.overflow;
      contentArea.style.overflow = 'hidden';
      void contentArea.offsetHeight; // Force reflow
      contentArea.style.overflow = originalOverflow || 'auto';
    }
  }
}