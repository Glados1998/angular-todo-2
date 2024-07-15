import { CanActivateFn } from '@angular/router';

export const isUserAuthGuard: CanActivateFn = (route, state) => {
  return !!localStorage.getItem('token');
};
