
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ Standalone hona chahiye
  imports: [RouterOutlet, RouterModule, NavbarComponent, FooterComponent], // Add FooterComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ style**Urls** (not styleUrl)
})
export class AppComponent {
  title = 'loanWebsite';

  isScrollButtonVisible = false;

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
      // Prevent tel: from opening on desktop
      event.preventDefault();

      // Show alert or custom popup
      alert('📞 Call us at: 9953656810');

      // Or use Angular Material dialog or Bootstrap modal if needed
    }

    // On mobile, default tel: link will work (no preventDefault)
  }













}
