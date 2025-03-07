import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn : boolean = false;
  firstName:any ;
  lastName  : any;
  constructor(private _service : HttpService , private authService : AuthService){}
  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); 
    if(this.isLoggedIn){
      this._service.getProfile().subscribe((response)=>{
        console.log(response[0].status);
        this.firstName = response[0].first_name;
        this.lastName = response[0].last_name
    })
  }
}


}
