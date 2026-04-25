import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const myToken = localStorage.getItem('myToken');
  const router = inject(Router);
  if (myToken) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
