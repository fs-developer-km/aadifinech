import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PopupFormComponent } from '../../../services/popup-form/popup-form.component';



@Component({
  selector: 'app-blog-page',
  imports: [CommonModule, RouterModule, PopupFormComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent {

    ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

 @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;

  openForm() {
    this.popupForm.serviceName = 'Become Our Channel Partner';
    this.popupForm.open();
  }
}
