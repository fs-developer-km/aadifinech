import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
@Component({
  selector: 'app-cookies-popup',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cookies-popup.component.html',
  styleUrls: ['./cookies-popup.component.css']
})
export class CookiesPopupComponent implements OnInit {

  showCookiePopup = false;
  showDetails = false;
  analyticsEnabled = true;
  marketingEnabled = false;

  constructor(private visitorService: AuthService) {}

  ngOnInit() {
    // ✅ API call: track visitor when page loads
    this.trackVisitorActivity();

    // 🍪 Check cookie consent
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => {
        this.showCookiePopup = true;
      }, 500);
    }
  }

  // 🔹 Track Visitor Function
  trackVisitorActivity() {
    const currentPage = window.location.pathname.replace('/', '') || 'home';

    this.visitorService.trackVisitor(currentPage).subscribe((res: any) => {
      if (res.success) {
        console.log('✅ Visitor tracked:', res.visitor);
        console.log("all data from cookies console ", res);
        
      } else {
        console.warn('⚠️ Visitor not tracked:', res.message);
      }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  onAcceptAll() {
    this.analyticsEnabled = true;
    this.marketingEnabled = true;
    this.saveCookiePreferences('accepted');
    this.closeCookiePopup();
  }

  onDecline() {
    this.analyticsEnabled = false;
    this.marketingEnabled = false;
    this.saveCookiePreferences('declined');
    this.closeCookiePopup();
  }

  saveCookiePreferences(status: string) {
    const preferences = {
      status: status,
      essential: true,
      analytics: this.analyticsEnabled,
      marketing: this.marketingEnabled,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('cookieConsent', JSON.stringify(preferences));

    if (this.analyticsEnabled) console.log('Analytics enabled');
    if (this.marketingEnabled) console.log('Marketing enabled');
  }

  closeCookiePopup() {
    this.showCookiePopup = false;
  }
}
