import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  // ==================================================
  // 🔥 Add Bearer Token to ALL API requests
  // ==================================================
  const clonedReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  // ==================================================
  // 🔥 Handle All Response Errors
  // ==================================================
  return next(clonedReq).pipe(
    catchError((error) => {
      console.error("🔴 Interceptor Error:", error);

      // ===============================
      // 🔥 Token Expired or Invalid
      // ===============================
      if (error.status === 401) {
        console.warn("⚠ Token expired or invalid");

        authService.logout();

        // Redirect to login page
        router.navigate(['/login'], {
          queryParams: { sessionExpired: true }
        });
      }

      // ===============================
      // 🔥 User Not Allowed (403)
      // ===============================
      else if (error.status === 403) {
        console.warn("⛔ Access Forbidden (403)");

        const role = authService.getRole();

        // Block access & send user back to their correct dashboard
        if (role === 'admin') router.navigate(['/admin']);
        else if (role === 'employee') router.navigate(['/employee']);
        else if (role === 'partner') router.navigate(['/partner']);
        else router.navigate(['/user']);
      }

      // Pass error forward
      return throwError(() => error);
    })
  );
};
