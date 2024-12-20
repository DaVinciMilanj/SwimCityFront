import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TokenInterceptorService } from '../../service/token-interceptor.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink ,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  openSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.add('active');
  }

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar?.classList.remove('active');
  }

  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // بررسی وضعیت لاگین
  }
  onLogout(): void {
    this.authService.logout();
  }

  
 
}
