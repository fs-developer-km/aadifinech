import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-investment-banking',
  imports: [CommonModule,PopupFormComponent],
  templateUrl: './investment-banking.component.html',
  styleUrl: './investment-banking.component.css'
})
export class InvestmentBankingComponent {
  @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;
  


  ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

// popup function

 openForm() {
    this.popupForm.serviceName = 'Debt Restructuring Services';
    this.popupForm.open();
  }


}
