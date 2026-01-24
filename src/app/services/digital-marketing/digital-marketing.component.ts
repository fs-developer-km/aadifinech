import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupFormComponent } from '../popup-form/popup-form.component';


@Component({
  selector: 'app-digital-marketing',
  imports: [CommonModule, PopupFormComponent, RouterModule],
  templateUrl: './digital-marketing.component.html',
  styleUrl: './digital-marketing.component.css'
})
export class DigitalMarketingComponent {

  @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;
  openForm() {
    this.popupForm.serviceName = 'Digital Marketing';
    this.popupForm.open();
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

}
