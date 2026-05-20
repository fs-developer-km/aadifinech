import { Component, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-training-placement',
  imports: [CommonModule,RouterModule,PopupFormComponent],
  templateUrl: './training-placement.component.html',
  styleUrl: './training-placement.component.css'
})
export class TrainingPlacementComponent {
    @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;

     constructor(
    private title: Title,
    private meta: Meta
  ) {

    this.title.setTitle('Student Training & Internship | Aadi Fintech');

    this.meta.updateTag({
      name: 'description',
      content: `The fintech industry does not wait for the unprepared. Aadi Fintech's immersive training and internship program fast-tracks students into real financial workflows, live client scenarios, and industry-grade tools — compressing years of learning into a career-defining experience that employers immediately recognize and reward.`
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Student Training, Internship Program, Fintech Training, Live Client Scenarios, Industry Grade Tools, Career Development, Financial Workflows, Student Internship'
    });

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

     openForm() {
    this.popupForm.serviceName = 'Manpower Training & Placement Services';
    this.popupForm.open();
  }

}
