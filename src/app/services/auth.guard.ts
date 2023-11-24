import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuth = inject(AuthService).isAuth();
  if (!isAuth) {
    inject(Router).navigate(['/login']);
  }
  return isAuth;
};
