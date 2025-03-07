import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenInterceptorService } from '../../service/token-interceptor.service';
import { CommonModule } from '@angular/common';
import { HttpService } from '../../service/http.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;

  userStatus:any;


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // وقتی بیرون از dropdown کلیک بشه، منو بسته بشه
  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (!(event.target as HTMLElement).closest('.nav-item')) {
      this.isDropdownOpen = false;
    }
  }
  openSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.toggle('active');
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.remove('active');
  }

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService , private _service:HttpService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); 
   
    if(this.isLoggedIn){
      this._service.getProfile().subscribe((response)=>{
        console.log(response[0].status);
        this.userStatus = response[0].status;
        
        
       
        
      })
    }
  }
  onLogout(): void {
    this.authService.logout();
  }

  
 
}
