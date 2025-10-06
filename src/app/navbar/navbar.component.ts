import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {


  constructor(private router: Router) {}

 dropdownOpen = false;
 // In your component .ts file
email: string = 'customer.care@aadifintech.com';


   ngOnInit(): void {
    // Jab bhi route change ho (routerLink pe click hone ke baad)
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dropdownOpen = false;
      }
    });
  }

  openDropdown() {
    this.dropdownOpen = true;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

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


  // Add this in your component
// mobileSubMenu: string | null = null;

// toggleMobileSubMenu(menu: string): void {
//   if (this.mobileSubMenu === menu) {
//     this.mobileSubMenu = null;
//   } else {
//     this.mobileSubMenu = menu;
//   }
// }

  
mobileSubMenu: string | null = null;

toggleMobileSubMenu(menu: string): void {
  this.mobileSubMenu = this.mobileSubMenu === menu ? null : menu;
}


}
