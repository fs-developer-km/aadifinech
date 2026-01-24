import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-services',
  imports: [CommonModule, PopupFormComponent, RouterModule],
  templateUrl: './tech-services.component.html',
  styleUrl: './tech-services.component.css'
})
export class TechServicesComponent {
  @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;
  openForm() {
    this.popupForm.serviceName = 'Tech Services';
    this.popupForm.open();
  }

    ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

}
