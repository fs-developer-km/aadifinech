import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, AuthResponse } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


 signupForm: FormGroup;
  loginForm: FormGroup;

  loadingSignup = false;
  loadingLogin = false;

  signupError = '';
  loginError = '';

  showLogin = true; // toggle between login/signup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Signup Form
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Login Form
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // ------------------ SIGNUP ------------------
  onSignup() {
    if (this.signupForm.invalid) return;

    this.loadingSignup = true;
    this.signupError = '';

    this.authService.signup(this.signupForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.loadingSignup = false;
        this.authService.saveToken(res.token);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: (err) => {
        this.loadingSignup = false;
        this.signupError = err.error?.msg || 'Signup failed. Try again.';
      }
    });
  }

  // ------------------ LOGIN ------------------
  onLogin() {
    if (this.loginForm.invalid) return;

    this.loadingLogin = true;
    this.loginError = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: AuthResponse) => {
        this.loadingLogin = false;
        this.authService.saveToken(res.token);

        if (res.user.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/user/dashboard']);
        }
      },
      error: (err) => {
        this.loadingLogin = false;
        this.loginError = err.error?.msg || 'Login failed. Try again.';
      }
    });
  }

  // Toggle between login/signup view
  toggleForm() {
    this.showLogin = !this.showLogin;
  }
}
