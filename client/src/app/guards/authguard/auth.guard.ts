import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map(response => {
      if (response.authenticated) {
        return true;
      }
      return router.parseUrl('/login');
    })
  );
};
