import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banking-domain-expert-consultancy',
  imports: [CommonModule, RouterModule, PopupFormComponent],
  templateUrl: './banking-domain-expert-consultancy.component.html',
  styleUrl: './banking-domain-expert-consultancy.component.css'
})
export class BankingDomainExpertConsultancyComponent {
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
    this.popupForm.serviceName = 'Banking Domain Expert Consultancy';
    this.popupForm.open();
  }
}
