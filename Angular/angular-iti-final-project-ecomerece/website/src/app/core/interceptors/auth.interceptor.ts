import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  let request = req;
  const token = tokenService.token;

  if (token && req.url.startsWith(environment.apiUrl)) {
    request = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && token) {
        tokenService.clear();
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url },
        });
      }
      return throwError(() => err);
    }),
  );
};
