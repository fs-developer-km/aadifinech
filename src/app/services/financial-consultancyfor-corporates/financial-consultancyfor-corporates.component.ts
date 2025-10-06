import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupFormComponent } from '../popup-form/popup-form.component';
@Component({
  selector: 'app-financial-consultancyfor-corporates',
  imports: [CommonModule,RouterModule,PopupFormComponent],
  templateUrl: './financial-consultancyfor-corporates.component.html',
  styleUrl: './financial-consultancyfor-corporates.component.css'
})
export class FinancialConsultancyforCorporatesComponent {

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
    this.popupForm.serviceName = 'Export Bill Discounting';
    this.popupForm.open();
  }
}
