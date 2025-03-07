import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


interface LoginResponse {
  token: string;
  is_superuser: boolean;
  is_staff: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl: string = 'http://0.0.0.0:8000/accounts/login/';
  private signupUrl: string = 'http://0.0.0.0:8000/accounts/signup/';

  constructor(private http: HttpClient, private router: Router) {}

  setToken(token: string): void {
    localStorage.setItem('authToken', token); // ذخیره توکن در localStorage
    console.log('Token saved:', token); // برای بررسی
}

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  login(user: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.loginUrl, { user, password }, { headers }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          localStorage.setItem('is_superuser', response.is_superuser.toString());
          localStorage.setItem('is_staff', response.is_staff.toString());
        } else {
          console.error('No token in response');
        }
      })
    );
  }
  

  
  signUp(userData: any): Observable<any> {
    return this.http.post(this.signupUrl, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    sessionStorage.clear(); 
    this.router.navigate(['/auth/login']);
}


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}

  

  

