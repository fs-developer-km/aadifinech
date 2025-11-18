// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../../core/services/auth.service';

// export const adminGuard: CanActivateFn = () => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   const token = authService.getToken();
//   if (!token) return router.parseUrl('/auth/login');

//   const user = authService.getUser();
//   const role = user?.role;

//   if (role === 'admin') return true;

//   switch (role) {
//     case 'employee':
//       return router.parseUrl('/employee/dashboard');
//     case 'partner':
//       return router.parseUrl('/partner/dashboard');
//     case 'user':
//       return router.parseUrl('/user/dashboard');
//     default:
//       return router.parseUrl('/auth/login');
//   }
// };


// import { CanActivateFn, Router, UrlTree } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from '../../core/services/auth.service';

// export const adminGuard: CanActivateFn = () => {

//   const authService = inject(AuthService);
//   const router = inject(Router);

//   // 1) Token check
//   const token = authService.getToken();
//   if (!token) return router.parseUrl('/auth/login');

//   // 2) Get user object
//   const user = authService.getUser();

//   // ❗Handle invalid or missing user/role
//   if (!user || !user.role) {
//     return router.parseUrl('/auth/login');
//   }

//   // 3) Allow ONLY ADMIN
//   if (user.role === 'admin') {
//     return true;
//   }

//   // 4) Redirect according to user's OWN role
//   return router.parseUrl(`/${user.role}/dashboard`);
// };


import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  if (!token) return router.parseUrl('/auth/login');

  const user = auth.getUser();
  if (!user) return router.parseUrl('/auth/login');

  // 🔥 Allow all roles (admin, employee, partner, user)
  return true;
};
