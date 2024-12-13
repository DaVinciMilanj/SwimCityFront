import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseUrl = "http://127.0.0.1:8000/accounts/forgot-password"

  constructor(private http : HttpClient) { }

  sendRecoveryCode(phone: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-recovery-code/`, { phone });
  }

  // تایید کد بازیابی
  verifyRecoveryCode(phone: string, recoveryCode: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-recovery-code/`, { phone, recoveryCode });
  }

  // تنظیم رمز عبور جدید
  resetPassword(phone: string, recoveryCode: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password/`, { phone, recoveryCode, newPassword });
  }
}
