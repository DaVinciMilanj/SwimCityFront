import { Component } from '@angular/core';
import { ticketEntity } from '../../model/pool-model/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { reserveTicketEntity } from '../../model/pool-model/ticketReserve.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  poolId: number;
  ticketId: number;
  poolTicket : ticketEntity;
  poolDetails : poolsEntity
  couponCode: string ;
  discount: number | null = null;
  finalPrice: number = 0;
  errorMessage: string = '';
  step: number = 1;
  full_name:string ;
  phone:string;
  quantity:number;
  reserveTicket : reserveTicketEntity;
  payment_id : number
  reservation_id : number
  paid_price : number;
  
  
    constructor(private route: ActivatedRoute , private _service : HttpService) { }

    ngOnInit(): void {
      this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));
      this.ticketId = Number(this.route.snapshot.paramMap.get('ticketId'));
  
      if (this.poolId) {
        this.getPoolTicket(); 
        this.getPoolDetails()
          }
    }

    getPoolTicket(){
      this._service.getTicketDetails(this.poolId ,this.ticketId).subscribe((response:ticketEntity)=>{
        this.poolTicket = response;
        console.log(this.poolTicket);

      })

    }

    getPoolDetails(){
      this._service.getPublicPoolDetails(this.poolId).subscribe((response:poolsEntity)=>{
        this.poolDetails = response;
        console.log(this.poolDetails);})
        }
    
    backStep(){
      this.step -=1;          
    }
    applyCoupon(){
      if (!this.couponCode.trim()) {
        this.errorMessage = 'لطفاً کد تخفیف را وارد کنید.';
        return;
      }
  
      this._service.checkTicketCoupon(this.poolId, this.ticketId,this.couponCode).subscribe(
        (response) => {
          this.discount = response.discount;
          this.finalPrice = response.final_price;
          this.errorMessage = ''; 
        },
        (error) => {
          this.discount = null;
          this.finalPrice = 0;
          this.errorMessage = error.error?.error || 'خطایی رخ داده است.';
        }
      )

    }
    
    nextsStep(){
      this.step = 2;
    }
    
    goFinall(){  
      this.reserveTicket = {
        ticket : this.ticketId,
        full_name : this.full_name,
        phone_number : this.phone,
        quantity : this.quantity,
      }
      console.log(this.finalPrice);
      

      this._service.reserveTicker(this.reserveTicket).subscribe((response)=>{
        this.payment_id = response.payment_id;
        this.reservation_id = response.reservation_id;

        console.log(response);
        
      })

      if(this.finalPrice){
        
      this.paid_price = this.finalPrice * this.quantity;

      }else{
        this.paid_price = this.poolTicket.final_price * this.quantity;
      }

      this.step = 3;
      
    }
    PaidTicket(){
      this._service.ticketPaid(this.payment_id , this.paid_price).subscribe((response)=>{
        console.log(response);
        window.open(response.url, "_blank");
      })

    }

    
  

}
