import { Component } from '@angular/core';
import { ForgetPasswordService } from './forget-password.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  phone: string = '';
  recoveryCode: string = '';
  newPassword: string = '';
  step: number = 1;

  constructor(private forgotPasswordService: ForgetPasswordService , private router: Router) {}

  sendRecoveryCode() {
    this.forgotPasswordService.sendRecoveryCode(this.phone).subscribe({
      next: () => {
        alert('کد بازیابی ارسال شد!');
        this.step = 2;
      },
      error: (error) => {
        console.error(error);
        alert('خطا در ارسال کد بازیابی');
      }
    });
  }

  verifyRecoveryCode() {
    console.log('Sending Recovery Code:', this.recoveryCode.trim()); // چاپ مقدار ارسالی برای بررسی
    this.forgotPasswordService.verifyRecoveryCode(this.phone, this.recoveryCode.trim()).subscribe({
      next: () => {
        alert('کد تایید شد!');
        this.step = 3;
      },
      error: () => {
        alert('کد بازیابی نامعتبر است');
      }
    });
  }

  resetPassword() {
    this.forgotPasswordService.resetPassword(this.phone, this.recoveryCode.trim(), this.newPassword).subscribe({
      next: () => {
        alert('رمز عبور با موفقیت تغییر کرد!');
        this.router.navigate(['/login']);
      },
      error: () => {
        alert('خطا در تنظیم رمز عبور جدید');
      }
    });
  }
}
