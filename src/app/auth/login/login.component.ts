import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  mode: string = 'login';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.updateValidators();
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

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (!field || !field.touched || !field.errors) return '';

    if (field.errors['required']) return `${fieldName} is required`;
    if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['pattern'] && fieldName === 'mobile') return 'Mobile must be 10 digits';

    return 'Invalid input';
  }

  switchMode(): void {
    this.mode = this.mode === 'login' ? 'signup' : 'login';

    this.loginForm.reset();
    this.errorMessage = '';
    this.successMessage = '';

    this.updateValidators();
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.loginForm.getRawValue();

    // ======================
    //      LOGIN MODE
    // ======================
    if (this.mode === 'login') {
      this.authService.login({ mobile: formData.mobile, password: formData.password }).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '✅ Login successful!';

          // Save token & user
          this.authService.saveToken(res.token);
          this.authService.setUser(res.user);

          setTimeout(() => {
            this.dialogRef.close();

            // ROLE BASED REDIRECT
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

    // ======================
    //      SIGNUP MODE
    // ======================
    else {
      this.authService.signup(formData).subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage = '🎉 Signup successful!';

          this.authService.saveToken(res.token);
          this.authService.setUser(res.user);

          setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate(['admin/userdash']);
          }, 1200);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.msg || '❌ Signup failed!';
        }
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
