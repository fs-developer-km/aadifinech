import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarServiceService {

private sidebarState = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this.sidebarState.asObservable();

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  setSidebar(state: boolean) {
    this.sidebarState.next(state);
  }
}



