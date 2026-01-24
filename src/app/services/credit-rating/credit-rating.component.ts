import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-rating',
  imports: [CommonModule, RouterModule, PopupFormComponent],
  templateUrl: './credit-rating.component.html',
  styleUrl: './credit-rating.component.css'
})
export class CreditRatingComponent {
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
    this.popupForm.serviceName = 'Credit Rating Advisory';
    this.popupForm.open();
  }
}
