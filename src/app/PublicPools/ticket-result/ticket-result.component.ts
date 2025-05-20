import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { error } from 'console';

@Component({
  selector: 'app-ticket-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-result.component.html',
  styleUrl: './ticket-result.component.css'
})
export class TicketResultComponent {
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
  
          this.paymentService.verifyTickets(this.authority, this.status)
            .subscribe({
              next: (res) => {
                console.log(res);
                if (res.status === 'success') {
                  this.ref_id = res.ref_id;
                  this.message = 'بلیط با موفقیت خریداری شد';
                  console.log(res);
                  setTimeout(() => {
                    this.router.navigate(['/']); // مسیر مورد نظر
                  }, 10000);
                  
                } else {
                  this.message = 'پرداخت ناموفق بود';
                  setTimeout(() => {
                    this.router.navigate(['/public-pools']); // مسیر مورد نظر
                  }, 10000);
                }
              },
              error: () => {
                this.message = 'خطا در ارتباط با سرور';
                console.log();
                
                
              }
            });
        } else {
          this.message = 'پرداخت لغو شد';
        }
      });
    }
  
  

}
