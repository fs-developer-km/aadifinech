import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authRedirectGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    const role = auth.getRole();

    switch (role) {
      case 'admin':
        router.navigateByUrl('/admin/dashboard');
        break;
      case 'employee':
        router.navigateByUrl('/employee/dashboard');
        break;
      case 'partner':
        router.navigateByUrl('/partner/dashboard');
        break;
      default:
        router.navigateByUrl('/user/dashboard');
    }

    return false;
  }

  return true;
};

