import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Teacher } from '../../model/users/teacher.model';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit {
  constructor(private activeRoute : ActivatedRoute , private _service:HttpService , private authService : AuthService,private router: Router
  ){}

  teacherId : number;
  teacherDetail : Teacher;
  loggedIn : boolean = false;
  stars: number[] = [1, 2, 3, 4, 5]; 
  userPreviousRate: number | null = null; // رأی قبلی کاربر
  selectedRating: number = 0; // رأی جدید کاربر




  ngOnInit(): void {
    this.teacherId = this.activeRoute.snapshot.params['teacherId'];
    this.loggedIn = this.authService.isLoggedIn();
    
    this._service.getTeacherDetails(this.teacherId).subscribe(
      (data: Teacher) => {
        this.teacherDetail = data;
        this.selectedRating = data.rate ;
        this.userPreviousRate = data.user_rating;
        
        console.log(this.selectedRating);
        
      },
      (error) => {
        console.error('Error fetching teacher details:', error);
      }
    );
  }
  rateTeacher(rating: number): void {
    this.selectedRating = rating;
  }

  submitRating(): void {
    if (this.selectedRating === 0) {
      console.log(this.selectedRating);
      this.router.navigate(['/teacher-details', this.teacherId]);
    }
  
    this._service.rateTeacher(this.teacherId, this.selectedRating).subscribe({
      next: () => {
        alert('Rating submitted successfully!');
        // به‌روزرسانی اطلاعات معلم بعد از ارسال امتیاز
        this._service.getTeacherDetails(this.teacherId).subscribe(
          (data: Teacher) => {
            this.teacherDetail = data;
          }
        );
      },
      error: (error) => {
        console.error('Error submitting rating:', error);
        alert('An error occurred while submitting your rating. Please try again.');
      },
    });
  }

  

}
