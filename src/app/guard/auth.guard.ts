
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('authToken'); // بررسی وجود توکن در localStorage

  if (token) {
    return true; // اگر توکن وجود داشت اجازه دسترسی داده شود
  } else {
    const router = new Router();
    router.navigate(['auth/login']);
    return false; // عدم دسترسی به مسیر
  }
};


