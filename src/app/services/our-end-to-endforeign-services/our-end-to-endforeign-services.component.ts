import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-end-to-endforeign-services',
  imports: [CommonModule,PopupFormComponent,RouterModule],
  templateUrl: './our-end-to-endforeign-services.component.html',
  styleUrl: './our-end-to-endforeign-services.component.css'
})
export class OurEndToEndforeignServicesComponent {
      @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;

        ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

     openForm() {
    this.popupForm.serviceName = 'Our End to End Foreign Services';
    this.popupForm.open();
  }
}
