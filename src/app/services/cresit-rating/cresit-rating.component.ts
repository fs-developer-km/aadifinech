import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cresit-rating',
  imports: [CommonModule, RouterModule, PopupFormComponent],
  templateUrl: './cresit-rating.component.html',
  styleUrl: './cresit-rating.component.css'
})
export class CresitRatingComponent {
    @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;


    openForm() {
    this.popupForm.serviceName = 'Credit Rating Advisory';
    this.popupForm.open();
  }
}
