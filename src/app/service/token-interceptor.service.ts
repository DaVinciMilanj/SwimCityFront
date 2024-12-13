import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      // افزودن توکن به Header
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    console.log(!!token);
    
    return !!token;
  }
}