import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const isLoginGuard: CanActivateFn = (route, state) => {
  const myToken = localStorage.getItem('myToken');
  const router = inject(Router);
  if (myToken) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
