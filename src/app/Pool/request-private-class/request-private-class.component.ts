import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { privateClassRequestEntity } from '../../model/pool-model/private-class-request.model';
import { ActivatedRoute, Router, RouterLink, RouterModule,  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-private-class',
  standalone: true,
  imports: [CommonModule , RouterLink , RouterModule],
  templateUrl: './request-private-class.component.html',
  styleUrl: './request-private-class.component.css'
})
export class RequestPrivateClassComponent implements OnInit {
  requestDetails : privateClassRequestEntity ;
  requestId : number;
  userStatus : any ;
  
  
  constructor(private _service : HttpService , private route: ActivatedRoute , private router:Router){}
  
  
  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('privateId')) ;
   
    

    this._service.privateClassDetails(this.requestId).subscribe((response : privateClassRequestEntity)=>{
      console.log(response);
      
      this.requestDetails = response

    })
    
    this._service.getProfile().subscribe((response)=>{
      this.userStatus = response[0].status;
      
      
     
      
    })
};

rejectRequest(requestId: number): void {
  this._service.rejectRequest(requestId).subscribe(
    () => {
      alert('Request rejected.');
      this.updateRequestDetails(); // به‌روزرسانی اطلاعات درخواست
    },
    (error) => console.error('Error rejecting request:', error)
  );
}

acceptRequest(requestId: number): void {
  this._service.acceptRequest(requestId).subscribe(
    () => {
      alert('Request accepted.');
      this.updateRequestDetails(); // به‌روزرسانی اطلاعات درخواست
    },
    (error) => console.error('Error accepting request:', error)
  );
}

// به‌روزرسانی اطلاعات درخواست
private updateRequestDetails(): void {
  this._service.privateClassDetails(this.requestId).subscribe(
    (response: privateClassRequestEntity) => {
      this.requestDetails = response;
    },
    (error) => console.error('Error updating request details:', error)
  );
}

deleteRequest(requestId: number): void {
  this._service.deleteRequest(requestId).subscribe(
    () => {
      alert('Request deleted.');
      this.router.navigate(['/private-class']); 
    },
    (error) => console.error('Error deleting request:', error)
  );
}



creatClass(requestId:number):void{
  this.router.navigate(['create-private-class' ,requestId] , {
    state:{
      userId : this.requestDetails.user.id 
    }
  })
  console.log(this.requestDetails.user.id);
  
}

 



}  

  

