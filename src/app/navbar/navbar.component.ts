import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // isMobileMenuOpen = false;

  // toggleMobileMenu() {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;
  // }

  // closeMobileMenu() {
  //   this.isMobileMenuOpen = false;
  // }


  // isMobileMenuOpen = false;


  // toggleMobileMenu() {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;
  // }

  isMobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  

}
