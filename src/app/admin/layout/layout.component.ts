import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, CommonModule, TopbarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  // isSidebarOpen = true;
  isUserDash = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        // Agar route me 'userdash' aaya to hide sidebar/topbar
        this.isUserDash = event.url.includes('/admin/userdash');
      });
  }

  isSidebarOpen: boolean = true; // shared state

  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
      console.log('✅ Layout - Sidebar state i am from layout:', this.isSidebarOpen);

  }


  //  isSidebarOpen: boolean = true;

  // toggleSidebar() {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  // }
}
