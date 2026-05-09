import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const token = inject(TokenService);
  const router = inject(Router);

  if (token.has()) return true;

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};

export const guestGuard: CanActivateFn = () => {
  const token = inject(TokenService);
  const router = inject(Router);
  return token.has() ? router.createUrlTree(['']) : true;
};
