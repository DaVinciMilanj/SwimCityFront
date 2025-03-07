import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const forbiddenGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
  const router = inject(Router); 

  if (token) {
    router.navigate(['/profile']); 
    return false;
  }
  
  return true;
};