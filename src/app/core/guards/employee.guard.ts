import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export const employeeGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // 1) Token check
  const token = authService.getToken();
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 2) Get user from localStorage
  const user = authService.getUser();

  if (!user || !user.role) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 3) Allow only EMPLOYEE
  if (user.role === 'employee') {
    return true;
  }

  // 4) Redirect based on role
  switch (user.role) {
    case 'admin':
      router.navigate(['/admin/dashboard']);
      break;
    case 'partner':
      router.navigate(['/partner/dashboard']);
      break;
    case 'user':
      router.navigate(['/admin/userdash']);
      break;
    default:
      router.navigate(['/']);
  }

  return false;
};


// import { CanActivateFn, Router, UrlTree } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../../core/services/auth.service';

// export const employeeGuard: CanActivateFn = () => {

//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // 1) Token check
//   const token = authService.getToken();
//   if (!token) {
//     return router.parseUrl('/auth/login');
//   }

//   // 2) Get user from localStorage
//   const user = authService.getUser();
//   if (!user || !user.role) {
//     return router.parseUrl('/auth/login');
//   }

//   // 3) Allow only EMPLOYEE
//   if (user.role === 'employee') {
//     return true;
//   }

//   // 4) Redirect OTHER roles to their own dashboards
//   return router.parseUrl(`/${user.role}/dashboard`);
// };
