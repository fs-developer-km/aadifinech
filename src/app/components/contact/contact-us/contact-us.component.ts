import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}


contactForm: FormGroup;
isContactSubmitted = false;
isSubmitting = false;

adminNumber: string = '919953656810'; // You can move this to environment file if needed

constructor(private fb: FormBuilder) {
  this.contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    number: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });
}

sendContactToWhatsApp(): void {
  if (this.contactForm.valid && !this.isSubmitting) {
    this.isSubmitting = true;

    const { name, email, number, subject, message } = this.contactForm.value;

    const whatsappMessage = `
📩 *New Contact Us Enquiry!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${number}
🏷️ *Subject:* ${subject}
💬 *Message:* ${message}

🕒 *Received on:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 _Please follow up promptly!_
    `;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${this.adminNumber}?text=${encodedMessage}`;

    // Open WhatsApp chat
    window.open(whatsappURL, '_blank');

    // Reset form after slight delay (optional UX improvement)
    setTimeout(() => {
      this.contactForm.reset();
      this.isContactSubmitted = true;
      this.isSubmitting = false;
    }, 500);

  } else {
    this.contactForm.markAllAsTouched();
    this.isContactSubmitted = false;
  }
}

}
