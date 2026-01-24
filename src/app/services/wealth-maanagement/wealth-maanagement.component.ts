import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wealth-maanagement',
  imports: [CommonModule,RouterModule,PopupFormComponent],
  templateUrl: './wealth-maanagement.component.html',
  styleUrl: './wealth-maanagement.component.css'
})
export class WealthMaanagementComponent {

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
    this.popupForm.serviceName = 'Wealth Management';
    this.popupForm.open();
  }

}
