import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.css'
})
export class PaymentResultComponent {
  status: string = '';
  authority: string = '';
  ref_id: string ;
  message: string = '';


 

  constructor(private route : ActivatedRoute , private paymentService : HttpService ,private router: Router ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.status = params['Status'];
      this.authority = params['Authority'];

      if (this.status === 'OK' && this.authority) {
        const poolId = Number(localStorage.getItem('pool_id'));
        const courseId = Number(localStorage.getItem('course_id'));

        this.paymentService.verifyPaidCourse(poolId, courseId, this.authority, this.status)
          .subscribe({
            next: (res) => {
              if (res.status === 'success') {
                this.ref_id = res.ref_id;
                this.message = 'پرداخت با موفقیت انجام شد';
                console.log(res);
                setTimeout(() => {
                  this.router.navigate(['/my-private-class']); // مسیر مورد نظر
                }, 5000);
                
              } else {
                this.message = 'پرداخت ناموفق بود';
                setTimeout(() => {
                  this.router.navigate(['/pools']); // مسیر مورد نظر
                }, 6000);
              }
            },
            error: () => {
              this.message = 'خطا در ارتباط با سرور';
              
            }
          });
      } else {
        this.message = 'پرداخت لغو شد';
        setTimeout(() => {
          this.router.navigate(['/pools']); // مسیر مورد نظر
        }, 7000);
      }
    });
  }


}