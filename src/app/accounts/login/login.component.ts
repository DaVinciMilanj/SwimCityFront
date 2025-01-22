import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule  , CommonModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['']); // هدایت به صفحه مورد نظر بعد از لاگین موفق
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password.';
      }
    });
  }

}
