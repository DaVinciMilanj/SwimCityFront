import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { PrivateClass } from '../../model/pool-model/private-class.model';
import { CommonModule } from '@angular/common';
import { PaidPipe } from '../../pip/paid.pipe';
import { RouterLink, RouterModule } from '@angular/router';
import { MyCourse } from '../../model/pool-model/my-course.model';

@Component({
  selector: 'app-user-private-classes',
  standalone: true,
  imports: [CommonModule , PaidPipe , RouterModule , ],
  templateUrl: './user-private-classes.component.html',
  styleUrl: './user-private-classes.component.css'
})
export class UserPrivateClassesComponent implements OnInit {

  privateClass : PrivateClass[];
  myCourse : MyCourse[];

  userStatus : any ;
  
  
  constructor(private _service:HttpService ){}
  
  
  ngOnInit(): void {
    this._service.showUserPrivateClass().subscribe((response:PrivateClass[])=>{
      this.privateClass = response
      
    })

    this._service.myCourse().subscribe((response)=>{
      this.myCourse = response
      console.log(this.myCourse);
      
    })

    this._service.getProfile().subscribe((response) => {
      this.userStatus = response[0].status;})



  }

}
