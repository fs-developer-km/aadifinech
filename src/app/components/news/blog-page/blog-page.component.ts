import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-popup-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css'
})
export class BlogPageComponent {

  devOtp: string = '';
  isOpen = false;
  isLoading = false;
  showSuccess = false;
  currentStep = 1;

  formData = {
    name: '',
    mobile: '',
    otp: ''
  };

  otpDigits = ['', '', '', '', '', ''];

  canResend = false;
  resendTimer = 60;
  timerInterval: any;

  constructor(private http: HttpClient) { }

  openForm() {
    this.isOpen = true;
    this.currentStep = 1;
    this.showSuccess = false;
    document.body.style.overflow = 'hidden';
  }

  closeForm() {
    this.isOpen = false;
    this.showSuccess = false;
    this.currentStep = 1;
    document.body.style.overflow = 'auto';
    this.resetForm();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  sendOTP() {
    if (!this.formData.name || this.formData.name.trim().length < 3) {
      alert('Please enter your full name (minimum 3 characters)');
      return;
    }

    if (!this.formData.mobile || !/^[6-9]\d{9}$/.test(this.formData.mobile)) {
      alert('Please enter valid 10 digit mobile number');
      return;
    }

    this.isLoading = true;
    
    
    const payload = { mobile: this.formData.mobile.trim() };

    // this.http.post('http://localhost:5000/api/partner/send-otp', payload)
    this.http.post('https://api.aadifintech.com/api/partner/send-otp', payload)
      .subscribe({
        next: (res: any) => {
          console.log('✅ OTP Sent:', res);
          this.isLoading = false;
          this.currentStep = 2;
          this.startResendTimer();

           // ✅ DEV OTP SAVE
      this.devOtp = res?.data?.otp || '';

          setTimeout(() => {
            const firstInput = document.getElementById('otp-0') as HTMLInputElement;
            if (firstInput) firstInput.focus();
          }, 100);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('❌ OTP Error:', err);
          const errorMsg = err.error?.message || 'Failed to send OTP. Please try again.';
          alert(errorMsg);
        }
      });
  }

  verifyOTP() {
    const otp = this.otpDigits.join('');

    if (otp.length !== 6) {
      alert('Please enter complete 6-digit OTP');
      return;
    }



    this.isLoading = true;

    const payload = {
      name: this.formData.name.trim(),
      mobile: this.formData.mobile.trim(),
      otp: otp
    };

    // this.http.post('http://localhost:5000/api/partner/verify-register', payload)
    this.http.post('https://api.aadifintech.com/api/partner/verify-register', payload)
      .subscribe({
        next: (res: any) => {
          console.log('✅ Registration Success:', res);
          this.isLoading = false;
          this.showSuccess = true;
          if (this.timerInterval) {
            clearInterval(this.timerInterval);
          }
          setTimeout(() => this.closeForm(), 20000);
        },
        error: (err) => {
          this.isLoading = false;
          console.error('❌ Verification Error:', err);
          const errorMsg = err.error?.message || 'Invalid OTP. Please try again.';
          alert(errorMsg);
          this.clearAllOTPInputs();
        }
      });
  }

  resendOTP() {
    if (!this.canResend) return;

    this.isLoading = true;

    const payload = { mobile: this.formData.mobile.trim() };

    // this.http.post('http://localhost:5000/api/partner/resend-otp', payload)
    this.http.post('https://api.aadifintech.com/api/partner/resend-otp', payload)
      .subscribe({
        next: (res: any) => {
          console.log('✅ OTP Resent:', res);
          this.isLoading = false;
          this.clearAllOTPInputs();
          this.startResendTimer();
          alert('OTP resent successfully!');
        },
        error: (err) => {
          this.isLoading = false;
          console.error('❌ Resend Error:', err);
          alert('Failed to resend OTP. Please try again.');
        }
      });
  }

  // ✅ COMPLETELY REWRITTEN - NO DOUBLE INPUT
  onOTPInput(index: number, event: any) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Clear input first
    input.value = '';

    // Only allow single digit number
    if (/^[0-9]$/.test(value)) {
      this.otpDigits[index] = value;
      input.value = value;

      // Move to next
      if (index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      } else {
        // Last box - check if all filled
        const allFilled = this.otpDigits.every(d => d !== '');
        if (allFilled) {
          setTimeout(() => this.verifyOTP(), 300);
        }
      }
    } else {
      // Invalid input - keep current value
      input.value = this.otpDigits[index];
    }
  }

  onOTPKeyDown(index: number, event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace') {
      event.preventDefault();

      if (this.otpDigits[index]) {
        // Clear current
        this.otpDigits[index] = '';
        input.value = '';
      } else if (index > 0) {
        // Move to previous and clear
        const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
        if (prevInput) {
          this.otpDigits[index - 1] = '';
          prevInput.value = '';
          prevInput.focus();
        }
      }
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      event.preventDefault();
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onOTPPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');

    if (pastedData && /^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');

      digits.forEach((digit, i) => {
        this.otpDigits[i] = digit;
        const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
        if (input) input.value = digit;
      });

      const lastInput = document.getElementById('otp-5') as HTMLInputElement;
      if (lastInput) lastInput.focus();

      setTimeout(() => this.verifyOTP(), 300);
    }
  }

  clearAllOTPInputs() {
    this.otpDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
      if (input) input.value = '';
    }
    setTimeout(() => {
      const firstInput = document.getElementById('otp-0') as HTMLInputElement;
      if (firstInput) firstInput.focus();
    }, 100);
  }

  startResendTimer() {
    this.canResend = false;
    this.resendTimer = 60;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      this.resendTimer--;
      if (this.resendTimer <= 0) {
        this.canResend = true;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  goBack() {
    this.currentStep = 1;
    this.clearAllOTPInputs();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  resetForm() {
    this.formData = {
      name: '',
      mobile: '',
      otp: ''
    };
    this.otpDigits = ['', '', '', '', '', ''];
    this.canResend = false;
    this.resendTimer = 60;
  }
}