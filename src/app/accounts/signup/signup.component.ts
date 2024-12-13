import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule ,FormsModule ,ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  registrationSuccess: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService , private router : Router) { }

  onSubmit(signUpForm: NgForm): void {
    if (signUpForm.valid) {
      this.authService.signUp(signUpForm.value).subscribe(
        (response) => {
          this.registrationSuccess = true;
          console.log('Registration successful:', response);
          signUpForm.reset();
          this.router.navigate(['auth/login']);
          
        },
        (error) => {
          this.errorMessage = error.error.message || 'Registration failed.';
          console.error('Error during registration:', error);
        }
      );
    }
  }
  

}
