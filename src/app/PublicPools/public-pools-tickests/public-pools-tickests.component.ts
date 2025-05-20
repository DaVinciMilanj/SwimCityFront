import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { ticketEntity } from '../../model/pool-model/ticket.model';

@Component({
  selector: 'app-public-pools-tickests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-pools-tickests.component.html',
  styleUrl: './public-pools-tickests.component.css'
})
export class PublicPoolsTickestsComponent implements OnInit {
   pool: poolsEntity;
    poolId: number ;
    searchText: string = '';
    sortOrder : string = '' ;
    poolTickets : ticketEntity[];


    constructor(private route: ActivatedRoute , private _service : HttpService , private router:Router) { }
  
  ngOnInit(): void {
    this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));

    if (this.poolId) {
      this.getPoolDetails();
      this.getPoolTickets();

          
        }
  }

  getPoolDetails(){
    this._service.getPublicPoolDetails(this.poolId).subscribe((res) => {
      this.pool = res;
      
    });
  }

  getPoolTickets(){
    this._service.getPoolTicket(this.poolId).subscribe((res) => {
      console.log(res);
      
      this.poolTickets = res;
    });
  }

  buyPage(ticketId:number){
    this.router.navigate(['public-pools', this.poolId, 'tickets', ticketId]);

  }


}
