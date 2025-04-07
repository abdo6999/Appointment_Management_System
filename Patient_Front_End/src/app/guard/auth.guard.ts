import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if( route.routeConfig?.path === 'guest') {
    if(localStorage.getItem('guest')){
      return false
    }
    return true
  }
  
  if (route.routeConfig?.path === 'login' || route.routeConfig?.path === 'sign-up' ) {
    return authService.checkAuth().pipe(
      map((response: any) => {
        if (response.authenticated) {
          router.navigate(['/home']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }


  return authService.checkAuth().pipe(
    map((response) => {
      if (response.authenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
