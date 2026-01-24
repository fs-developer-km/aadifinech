import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { UserEnquiryComponent } from './components/user-enquiry/user-enquiry.component';
import { CommonModule } from '@angular/common';
import { CookiesPopupComponent } from "./cookies-popup/cookies-popup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, UserEnquiryComponent, NavbarComponent, FooterComponent, CommonModule, CookiesPopupComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'loanWebsite';
  isScrollButtonVisible = false;
  showPopup = false; // ✅ Popup control ke liye

    constructor(public router: Router) {}


  ngOnInit(): void {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 10 seconds
      setTimeout(() => {
        this.showPopup = true;
      }, 20000);
    }
  }
 // Function to check if current route is admin
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrollButtonVisible = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleCallClick(event: Event): void {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    if (!isMobile) {
      event.preventDefault();
      alert('📞 Call us at: 9953656810');
    }
  }
}