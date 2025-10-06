import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupFormComponent } from '../popup-form/popup-form.component';

@Component({
  selector: 'app-fund-raising',
  imports: [RouterModule,PopupFormComponent],
  templateUrl: './fund-raising.component.html',
  styleUrl: './fund-raising.component.css'
})
export class FundRaisingComponent {
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
    this.popupForm.serviceName = 'Fund Raising';
    this.popupForm.open();
  }

}
