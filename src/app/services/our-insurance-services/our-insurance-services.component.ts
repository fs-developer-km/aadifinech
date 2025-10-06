import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-insurance-services',
  imports: [CommonModule,PopupFormComponent,RouterModule],
  templateUrl: './our-insurance-services.component.html',
  styleUrl: './our-insurance-services.component.css'
})
export class OurInsuranceServicesComponent {

  

    @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;

     ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });  // 🔹 page top pe chala jayega
  }
  scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

   openForm() {
    this.popupForm.serviceName = 'Our Insurance Services';
    this.popupForm.open();
  }
}
