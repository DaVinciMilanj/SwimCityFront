import { Component } from '@angular/core';
import { ForgetPasswordService } from './forget-password.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  phone: string = '';
  recoveryCode: string = '';
  newPassword: string = '';
  step: number = 1; // مرحله فعلی (1: ارسال کد، 2: تایید کد، 3: تنظیم رمز)

  constructor(private forgotPasswordService: ForgetPasswordService) {}

  // ارسال کد بازیابی
  sendRecoveryCode() {
    this.forgotPasswordService.sendRecoveryCode(this.phone).subscribe({
      next: (response) => {
        console.log(response);
        alert('کد بازیابی ارسال شد!');
        this.step = 2; // به مرحله بعد بروید
      },
      error: (error) => {
        console.error(error);
        alert('خطا در ارسال کد بازیابی');
      }
    });
  }

  // تایید کد بازیابی
  verifyRecoveryCode() {
    this.forgotPasswordService.verifyRecoveryCode(this.phone, this.recoveryCode).subscribe({
      next: (response) => {
        console.log(response);
        alert('کد تایید شد!');
        this.step = 3; // به مرحله تنظیم رمز بروید
      },
      error: (error) => {
        console.error(error);
        alert('کد بازیابی نامعتبر است');
      }
    });
  }

  // تنظیم رمز عبور جدید
  resetPassword() {
    this.forgotPasswordService.resetPassword(this.phone, this.recoveryCode, this.newPassword).subscribe({
      next: (response ) => {
        console.log(response);
        alert('رمز عبور با موفقیت تغییر کرد!');
        this.step = 1; // بازگشت به مرحله اول
      },
      error: (error) => {
        console.error(error);
        alert('خطا در تنظیم رمز عبور جدید');
      }
    });
  }

}
