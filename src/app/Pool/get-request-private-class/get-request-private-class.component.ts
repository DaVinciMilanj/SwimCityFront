import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { privateClassRequestEntity } from '../../model/pool-model/private-class-request.model';
import { profile } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-request-private-class',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './get-request-private-class.component.html',
  styleUrl: './get-request-private-class.component.css'
})
export class GetRequestPrivateClassComponent implements OnInit {
  allRequests:privateClassRequestEntity[];
  userStatus:any;
  
  
  constructor(private _service:HttpService){}
  
  ngOnInit(): void {

    this._service.privateClassShow().subscribe((response)=>{
      this.allRequests = response;
      console.log(this.allRequests); 
      
    })
    this._service.getProfile().subscribe((response)=>{
      console.log(response[0].status);
      this.userStatus = response[0].status;
      
      
     
      
    })

    
  }

}
