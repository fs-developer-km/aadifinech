import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export const partnerGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // 1) Token check
  const token = authService.getToken();
  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 2) Get user object
  const user = authService.getUser();

  if (!user || !user.role) {
    router.navigate(['/auth/login']);
    return false;
  }

  // 3) Allow only PARTNER
  if (user.role === 'partner') {
    return true;
  }

  // 4) If not partner → redirect based on their role
  switch (user.role) {
    case 'admin':
      router.navigate(['/admin/dashboard']);
      break;

    case 'employee':
      router.navigate(['/employee/dashboard']);
      break;

    case 'user':
      router.navigate(['/admin/userdash']);
      break;

    default:
      router.navigate(['/']);
  }

  return false;
};
