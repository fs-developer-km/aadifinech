import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bill-discounts',
  imports: [CommonModule, RouterModule, PopupFormComponent],
  templateUrl: './bill-discounts.component.html',
  styleUrl: './bill-discounts.component.css'
})
export class BillDiscountsComponent {
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
    this.popupForm.serviceName = 'Bill Discounting Solutions';
    this.popupForm.open();
  }
}
