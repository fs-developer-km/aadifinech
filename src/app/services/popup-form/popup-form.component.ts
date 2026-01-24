// popup-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-popup-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './popup-form.component.html',
  styleUrls: ['./popup-form.component.css']
})
export class PopupFormComponent {
  @Input() serviceName: string = '';
  @ViewChild('popupBackdrop', { static: false }) popupBackdrop!: ElementRef;

  name: string = '';
  email: string = '';
  mobile: string = '';
  message: string = '';
  showPopup: boolean = false;
  isClosing: boolean = false;

  constructor() {}

  open() {
    this.showPopup = true;
    this.isClosing = false;
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      const firstInput = document.querySelector('.popup-content input') as HTMLElement;
      if (firstInput) {
        firstInput.focus();
      }
    }, 400);
  }

  close() {
    if (this.isClosing) return;
    
    this.isClosing = true;
    if (this.popupBackdrop) {
      this.popupBackdrop.nativeElement.style.animation = 'fadeOut 0.3s ease-out forwards';
    }
    
    setTimeout(() => {
      this.showPopup = false;
      this.isClosing = false;
      this.resetForm();
      document.body.style.overflow = '';
    }, 300);
  }

  submit() {
    if (!this.name.trim() || !this.email.trim() || !this.mobile.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (!this.isValidMobile(this.mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    const whatsappNumber = '+919720349178';
    const text = `Hello, I want more information about the "${this.serviceName}" service.\n\nName: ${this.name}\nEmail: ${this.email}\nMobile: ${this.mobile}\nMessage: ${this.message || 'No additional message'}`;
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
    
    window.open(url, '_blank');
    this.close();
  }

  private resetForm() {
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.message = '';
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidMobile(mobile: string): boolean {
    const cleanMobile = mobile.replace(/\s+/g, '');
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(cleanMobile);
  }

  // Only allow numbers in mobile input
  onMobileInput(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^0-9]/g, '');
    this.mobile = event.target.value;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.showPopup && !this.isClosing) {
      const backdrop = event.target as HTMLElement;
      if (backdrop.classList.contains('popup-backdrop')) {
        this.close();
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showPopup && !this.isClosing) {
      this.close();
    }
  }
}