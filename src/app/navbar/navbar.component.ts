import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatDialogModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent {

  showLoginPopup = false;

  toggleLoginPopup() {
    this.showLoginPopup = !this.showLoginPopup;
  }


  constructor(private router: Router, private dialog: MatDialog) { }

  dropdownOpen = false;
  email: string = 'customer.care@aadifintech.com';


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.dropdownOpen = false;
      }
    });
  }


  //  openLogin() {
  //   this.dialog.open(LoginComponent, {
  //     width: '400px',
  //     disableClose: false
  //   });
  // }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      disableClose: false, // user can close by clicking outside
    panelClass: 'custom-dialog-container',
      data: { mode: 'login' } // optional
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
