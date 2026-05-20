// careers.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CareerFormData {
  fullName: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  location: string;
  notice: string;
  portfolio: string;
  message: string;
  consent: boolean;
}

@Component({
  selector: 'app-carrier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent {

  private readonly WHATSAPP_NUMBER = '918299007927';

  formData: CareerFormData = {
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    location: '',
    notice: '',
    portfolio: '',
    message: '',
    consent: false
  };

  isSubmitting: boolean = false;
  formStatus: string = '';
  submitted: boolean = false;

  submitApplication(): void {
    // Validation
    if (!this.formData.fullName.trim()) {
      this.formStatus = '⚠️ Please enter your full name.';
      return;
    }
    if (!this.formData.email.trim()) {
      this.formStatus = '⚠️ Please enter your email address.';
      return;
    }
    if (!this.formData.phone.trim()) {
      this.formStatus = '⚠️ Please enter your contact number.';
      return;
    }
    if (!this.formData.role) {
      this.formStatus = '⚠️ Please select a role.';
      return;
    }
    if (!this.formData.experience) {
      this.formStatus = '⚠️ Please select your experience level.';
      return;
    }
    if (!this.formData.message.trim()) {
      this.formStatus = '⚠️ Please write a brief profile summary.';
      return;
    }


    this.isSubmitting = true;
    this.formStatus = '';

    // Build WhatsApp message
    const lines: string[] = [
      '🏢 *New Career Application — Aadi Fintech*',
      '',
      `👤 *Name:* ${this.formData.fullName}`,
      `📧 *Email:* ${this.formData.email}`,
      `📱 *Phone:* ${this.formData.phone}`,
      `💼 *Role:* ${this.formData.role}`,
      `📅 *Experience:* ${this.formData.experience}`,
    ];

    if (this.formData.location) {
      lines.push(`📍 *Location:* ${this.formData.location}`);
    }
    if (this.formData.notice) {
      lines.push(`⏱️ *Notice Period:* ${this.formData.notice}`);
    }
    if (this.formData.portfolio) {
      lines.push(`🔗 *Portfolio/LinkedIn:* ${this.formData.portfolio}`);
    }

    lines.push('');
    lines.push(`📝 *Summary:*`);
    lines.push(this.formData.message);
    lines.push('');
    lines.push('_Submitted via Aadi Fintech Careers Page_');

    const whatsappText = lines.join('\n');
    const encodedText = encodeURIComponent(whatsappText);
    const whatsappUrl = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    // Reset form
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      role: '',
      experience: '',
      location: '',
      notice: '',
      portfolio: '',
      message: '',
      consent: false
    };

    this.isSubmitting = false;
    this.submitted = true;
  }

  dismissSuccess(): void {
    this.submitted = false;
  }
}