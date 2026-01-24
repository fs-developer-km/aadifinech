import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // 🔥 Get token
  const token = authService.getToken();

  // 🔥 Clone request and attach token (if exists)
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // 🔥 Pass request + Global error handling
  return next(authReq).pipe(
    catchError((error) => {
      console.error('🔴 Interceptor Error:', error);

      // ============================
      // 🔥 401 → Token Invalid/Expired
      // ============================
      if (error.status === 401) {
        console.warn("⚠ Invalid or expired token.");

        authService.logout();

        router.navigate(['/login'], {
          queryParams: { sessionExpired: true }
        });
      }

      // ============================
      // 🔥 403 → Access Forbidden
      // ============================
      if (error.status === 403) {
        console.warn("⛔ Forbidden Access (403)");

        const role = authService.getRole();

        // 🔥 Redirect user based on role
        switch (role) {
          case 'admin':
            router.navigate(['/admin']);
            break;

          case 'employee':
            router.navigate(['/employee']);
            break;

          case 'partner':
            router.navigate(['/partner']);
            break;

          default:
            router.navigate(['/user']);
        }
      }

      return throwError(() => error);
    })
  );
};
