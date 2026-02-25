import { inject } from '@angular/core/primitives/di';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const token = localStorage.getItem('access_token');
  const localEmail = localStorage.getItem('email_user');

  if (!localEmail || !token) {
    return router.createUrlTree(['/login']);
  }

  return true;
};