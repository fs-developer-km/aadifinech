import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopupFormComponent } from '../popup-form/popup-form.component';

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-real-state',
  imports: [CommonModule, RouterModule,PopupFormComponent],
  templateUrl: './real-state.component.html',
  styleUrl: './real-state.component.css',
   animations: [
    trigger('accordionAnimation', [
      state('closed', style({ height: '0', opacity: 0, padding: '0 15px' })),
      state('open', style({ height: '*', opacity: 1, padding: '15px' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class RealStateComponent {

   @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;
 
activeIndex: number | null = null; // for first accordion
secondActiveIndex: number | null = null; // for second accordion
thirdActiveIndex: number | null = null; // for second accordion
fourActiveIndex: number | null = null; // for second accordion
fiveActiveIndex: number | null = null; // for second accordion

toggleAccordion(index: number) {
  this.activeIndex = this.activeIndex === index ? null : index;
}

toggleSecondAccordion(index: number) {
  this.secondActiveIndex = this.secondActiveIndex === index ? null : index;
}

toggleThirdAccourian(index: number) {
  this.thirdActiveIndex = this.thirdActiveIndex === index ? null : index;
}

toggleFourAccourian(index: number) {
  this.fourActiveIndex = this.fourActiveIndex === index ? null : index;
}

toggleFiveAccourian(index: number) {
  this.fiveActiveIndex = this.fiveActiveIndex === index ? null : index;
}


 accordionIndex: number | null = null;

  toggleAccordionx(index: number) {
    this.accordionIndex = this.accordionIndex === index ? null : index;
  }

accordionIndexxx: number | null = null;

  toggleAccordionxx(index: number) {
    this.accordionIndexxx = this.accordionIndexxx === index ? null : index;
  }

   openForm() {
    this.popupForm.serviceName = 'Real Estate Advisory';
    this.popupForm.open();
  }


}
