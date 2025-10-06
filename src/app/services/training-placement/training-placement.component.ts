import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-training-placement',
  imports: [CommonModule,RouterModule,PopupFormComponent],
  templateUrl: './training-placement.component.html',
  styleUrl: './training-placement.component.css'
})
export class TrainingPlacementComponent {
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
    this.popupForm.serviceName = 'Manpower Training & Placement Services';
    this.popupForm.open();
  }

}
