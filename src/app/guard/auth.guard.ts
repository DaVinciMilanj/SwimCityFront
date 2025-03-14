import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken'); 
  const router = inject(Router); 

  if (token) {
    return true;
  } else {
    router.navigate(['auth/login']); 
    return false; 
  }
};
