import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../Services/Auth/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(AuthServiceService);
  const router = inject(Router);

  const authData = AuthService.sendData();
  const isLoggedIn = authData?.isAuthenticated;

  const currentUrl = state.url;

  console.log('%c[Guard] currentUrl:', 'color: orange', currentUrl);
  console.log('%c[Guard] isLoggedIn:', 'color: orange', isLoggedIn);

  if ((currentUrl === '/SignUp' || currentUrl === '/LogIn') && isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (
    (currentUrl === '/Profile' || currentUrl === '/ChoosePlan') &&
    !isLoggedIn
  ) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
