import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-our-insurance-services',
  imports: [CommonModule,PopupFormComponent,RouterModule],
  templateUrl: './our-insurance-services.component.html',
  styleUrl: './our-insurance-services.component.css'
})
export class OurInsuranceServicesComponent {

  

    @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;


  constructor(
    private title: Title,
    private meta: Meta
  ) {

    this.title.setTitle('Financial & Professional Services | Aadi Fintech');

    this.meta.updateTag({
      name: 'description',
      content: `From loan restructuring and CIBIL restoration to business coaching, financing, and student career programs — Aadi Fintech offers a complete ecosystem of financial and professional services. Explore our solutions and discover how we turn financial challenges into opportunities.`
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Loan restructuring, CIBIL restoration, Business coaching, Financing services, Student career programs, Financial services, Professional services, Aadi Fintech'
    });

  }



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
