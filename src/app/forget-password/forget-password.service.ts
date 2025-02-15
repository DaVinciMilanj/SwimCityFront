import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseUrl = "http://127.0.0.1:8000/accounts/forgot-password";

  constructor(private http: HttpClient) {}

  sendRecoveryCode(phone: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-recovery-code/`, { phone });
  }

  verifyRecoveryCode(phone: string, recoveryCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-recovery-code/`, { phone, recoveryCode });
  }

  resetPassword(phone: string, recoveryCode: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password/`, { phone, recoveryCode, newPassword });
  }
}
