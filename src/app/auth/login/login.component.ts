import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, interval } from 'rxjs';

// ===============================
// INTERFACES
// ===============================

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'user' | 'admin' | 'employee' | 'partner';
  accountStatus: string;
  signupDate?: Date;
  lastLoginDate?: Date;
  lastLoginTime?: string;
  loginCount?: number;
  
  // Employee fields
  department?: string;
  designation?: string;
  employeeCode?: string;
  reportingTo?: string;
  allowedPermissions?: string[];
  
  // Partner fields
  companyName?: string;
  businessType?: string;
  commissionType?: string;
  commissionValue?: number;
  gstNumber?: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  token?: string;
  user?: User;
}

export interface OTPResponse {
  success: boolean;
  msg: string;
  data?: {
    mobile: string;
    expiresIn: number;

     // ✅ DEV MODE ONLY (IMPORTANT)
     otp?: string; 
    verificationToken?: string;
  };
}

// Custom Validator for Password Match
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) {
    return null;
  }
  
  return password.value === confirmPassword.value ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

    // ✅ Password visibility toggles
  showPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;


  loginForm!: FormGroup;
  forgotPasswordForm!: FormGroup;
  verifyOTPForm!: FormGroup;
  resetPasswordForm!: FormGroup;
  
  mode: string = 'login'; // 'login' | 'signup' | 'forgotPassword' | 'verifyOTP' | 'resetPassword'
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  
  // OTP Related
  otpTimer: number = 0;
  timerSubscription?: Subscription;
  verificationToken: string = '';
  tempMobile: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeForgotPasswordForms();
  }

  ngOnDestroy(): void {
    this.stopOtpTimer();
  }

    // ✅ Toggle functions
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }


  // ==================== FORM INITIALIZATION ====================

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.updateValidators();
  }

  initializeForgotPasswordForms(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    this.verifyOTPForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]]
    });

    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  updateValidators(): void {
    const nameControl = this.loginForm.get('name');

    if (this.mode === 'login') {
      nameControl?.clearValidators();
      nameControl?.disable();
    } else {
      nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
      nameControl?.enable();
    }

    nameControl?.updateValueAndValidity();
  }

  // ==================== VALIDATION ====================

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.touched || !field.errors) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['pattern'] && fieldName === 'mobile') return 'Mobile must be 10 digits';

    return 'Invalid input';
  }

  // ==================== MODE SWITCHING ====================

  switchMode(): void {
    this.mode = this.mode === 'login' ? 'signup' : 'login';

    this.loginForm.reset();
    this.errorMessage = '';
    this.successMessage = '';

    this.updateValidators();
  }

  switchToForgotPassword(): void {
    this.mode = 'forgotPassword';
    this.errorMessage = '';
    this.successMessage = '';
    this.forgotPasswordForm.reset();
  }

  backToLogin(): void {
    this.mode = 'login';
    this.errorMessage = '';
    this.successMessage = '';
    this.stopOtpTimer();
    this.clearAllForms();
  }

  clearAllForms(): void {
    this.loginForm.reset();
    this.forgotPasswordForm.reset();
    this.verifyOTPForm.reset();
    this.resetPasswordForm.reset();
    this.verificationToken = '';
    this.tempMobile = '';
  }

  // ==================== LOGIN / SIGNUP ====================

  submit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.loginForm.getRawValue();

    // LOGIN MODE
    if (this.mode === 'login') {
      this.authService.login({ mobile: formData.mobile, password: formData.password }).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '✅ Login successful!';

          this.authService.saveToken(res.token);
          this.authService.setUser(res.user);

          setTimeout(() => {
            this.dialogRef.close();

            switch (res.user?.role) {
              case 'admin':
                this.router.navigate(['/admin/dashboard']);
                break;
              case 'employee':
                this.router.navigate(['admin/employee/dashboard']);
                break;
              case 'partner':
                this.router.navigate(['admin/partner/dashboard']);
                break;
              case 'user':
                this.router.navigate(['admin/user/dashboard']);
                break;
              default:
                this.router.navigate(['/auth/login']);
            }
          }, 1200);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.msg || '❌ Invalid credentials!';
        }
      });
    }

    // SIGNUP MODE
    else {
      this.authService.signup(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '🎉 Signup successful!';

          this.authService.saveToken(res.token);
          this.authService.setUser(res.user);

          setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate(['admin/user/dashboard']);
          }, 1200);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.msg || '❌ Signup failed!';
        }
      });
    }
  }

  // ==================== FORGOT PASSWORD - SEND OTP ====================

  otpFromBackend: string = ''; 
  sendOTP(): void {
    if (this.forgotPasswordForm.invalid) {
      this.markFormGroupTouched(this.forgotPasswordForm);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const mobile = this.forgotPasswordForm.get('mobile')?.value;
    this.tempMobile = mobile;

    this.authService.sendOTP({ mobile }).subscribe({
      next: (res: OTPResponse) => {
        this.loading = false;
        this.successMessage = `✅ ${res.msg}`;

         // ✅ YE LINE ADD KARO - Backend se OTP save karo
      this.otpFromBackend = res.data?.otp || '';
      // this.receivedOtp = res.data?.otp || '';


      console.log("otp from backend")

      
        
        // Start OTP timer
        this.otpTimer = res.data?.expiresIn || 300;
        this.startOtpTimer();

        // Switch to OTP verification mode
        setTimeout(() => {
          this.mode = 'verifyOTP';
          this.successMessage = '';
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.msg || '❌ Failed to send OTP!';
      }
    });
  }

  // ==================== OTP TIMER ====================

  startOtpTimer(): void {
    this.stopOtpTimer();
    
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.otpTimer > 0) {
        this.otpTimer--;
      } else {
        this.stopOtpTimer();
      }
    });
  }

  stopOtpTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  resendOTP(): void {
    this.otpFromBackend = ''; 
    this.forgotPasswordForm.patchValue({ mobile: this.tempMobile });
    this.verifyOTPForm.reset();
    this.clearOtpBoxes();
    this.sendOTP();
  }

  // ==================== OTP INPUT HANDLING ====================

  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      input.value = '';
      return;
    }

    // Update form control
    this.updateOtpFormValue();

    // Move to next box
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    // Handle backspace
    if (event.key === 'Backspace' && !input.value && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.select();
      }
    }

    // Handle arrow keys
    if (event.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }

    if (event.key === 'ArrowRight' && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  updateOtpFormValue(): void {
    let otpValue = '';
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
      if (input) {
        otpValue += input.value;
      }
    }
    this.verifyOTPForm.patchValue({ otp: otpValue });
  }

  clearOtpBoxes(): void {
    for (let i = 0; i < 6; i++) {
      const input = document.getElementById(`otp-${i}`) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    }
  }

  // ==================== VERIFY OTP ====================

  verifyOTP(): void {
    if (this.verifyOTPForm.invalid) {
      this.markFormGroupTouched(this.verifyOTPForm);
      this.errorMessage = '❌ Please enter 6-digit OTP';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const otp = this.verifyOTPForm.get('otp')?.value;

    this.authService.verifyOTP({ mobile: this.tempMobile, otp }).subscribe({
      next: (res: OTPResponse) => {
        this.loading = false;
        this.successMessage = `✅ ${res.msg}`;
        
        // Store verification token
        this.verificationToken = res.data?.verificationToken || '';
        
        this.stopOtpTimer();

        // Switch to reset password mode
        setTimeout(() => {
          this.mode = 'resetPassword';
          this.successMessage = '';
        }, 1500);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.msg || '❌ Invalid OTP!';
        this.clearOtpBoxes();
        this.verifyOTPForm.reset();
      }
    });
  }

  // ==================== RESET PASSWORD ====================

  resetPassword(): void {
    if (this.resetPasswordForm.invalid) {
      this.markFormGroupTouched(this.resetPasswordForm);
      
      if (this.resetPasswordForm.errors?.['passwordMismatch']) {
        this.errorMessage = '❌ Passwords do not match!';
      }
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const newPassword = this.resetPasswordForm.get('newPassword')?.value;

    this.authService.resetPassword({
      mobile: this.tempMobile,
      verificationToken: this.verificationToken,
      newPassword
    }).subscribe({
      next: (res: AuthResponse) => {
        this.loading = false;
        this.successMessage = `✅ ${res.msg}`;

        // Clear all data
        this.clearAllForms();
        this.stopOtpTimer();

        // Redirect to login
        setTimeout(() => {
          this.mode = 'login';
          this.successMessage = '';
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.msg || '❌ Failed to reset password!';
      }
    });
  }

  // ==================== HELPER METHODS ====================

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  close(): void {
    this.stopOtpTimer();
    this.dialogRef.close();
  }

  // for auto login
  loginSuccess(res: any) {
  this.authService.saveToken(res.token);
  this.authService.saveRole(res.user.role);

  this.dialogRef.close();

  const role = res.user.role;

  switch (role) {
    case 'admin':
      this.router.navigate(['/admin/dashboard']);
      break;
    case 'employee':
      this.router.navigate(['/employee/dashboard']);
      break;
    case 'partner':
      this.router.navigate(['/partner/dashboard']);
      break;
     case 'user':
      this.router.navigate(['/user/dashboard']);
  }
}

}