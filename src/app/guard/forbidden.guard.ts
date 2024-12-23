import { CanActivateFn, Router } from '@angular/router';

export const forbiddenGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken');
   
  if (token) {
       const router = new Router();
        router.navigate(['profile']);
        return false; // عدم دسترسی به مسیر
       // اگر توکن وجود داشت اجازه دسترسی داده شود
    } else {
      return true;
    
    }
};
