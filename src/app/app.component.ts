
import { Component,HostListener } from '@angular/core';
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
}
