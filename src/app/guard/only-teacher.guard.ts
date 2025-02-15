import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpService } from '../service/http.service';

export const onlyTeacherGuard: CanActivateFn = (route, state) => {
  const httpService = inject(HttpService);
  const router = inject(Router);


  return new Promise<boolean>((resolve) => {
    httpService.getProfile().subscribe(
      
      (profile) => {        
        if (profile[0].status === 'teacher') {
          resolve(true); 
        } else {
          router.navigate(['/access-denied']); 
          resolve(false);
        }
      },
      (error) => {
        console.error('Error fetching profile:', error);
        router.navigate(['/login']); // هدایت به صفحه ورود در صورت بروز خطا
        resolve(false);
      }
    );
  });
};
