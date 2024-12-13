
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const isSuperuser = localStorage.getItem('is_superuser') === 'true';
  const isStaff = localStorage.getItem('is_staff') === 'true';
  

  if (token && (isSuperuser || isStaff)) {
    return true; // اگر کاربر لاگین کرده و ادمین یا سوپریوزر باشد، اجازه دسترسی می‌دهد
  } else {
    const router = new Router()
    router.navigate(['auth/login']); // هدایت به صفحه لاگین اگر دسترسی ندارند
    return false;
  }
};
