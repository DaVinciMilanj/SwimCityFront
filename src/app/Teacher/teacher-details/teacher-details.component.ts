import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { Teacher } from '../../model/users/teacher.model';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../../model/users/profile.model';
import { ReturnStatement } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { TeacherComment } from '../../model/users/teacher-comment.model';
import { TeacherCommentComponent } from "../teacher-comment/teacher-comment.component";


@Component({
  selector: 'app-teacher-details',
  standalone: true,
  imports: [CommonModule, FormsModule, TeacherCommentComponent],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css'
})
export class TeacherDetailsComponent implements OnInit {
  constructor(private activeRoute : ActivatedRoute , private _service:HttpService ,
     private authService : AuthService,private router: Router ,
  ){}

  sendUserId : number ;
  teacherId : number;
  teacherDetail : Teacher;
  loggedIn : boolean = false;
  stars: number[] = [1, 2, 3, 4, 5]; 
  userPreviousRate: number | null = null; // رأی قبلی کاربر
  selectedRating: number = 0; // رأی جدید کاربر
  rate : number = 0
  hoveredRating :number = -1;
  userStatus : any ;
  
  comments: TeacherComment[] = [];
  newComment: string = '';


  ngOnInit(): void {
    this.teacherId = this.activeRoute.snapshot.params['teacherId'];
    this.loggedIn = this.authService.isLoggedIn();




    if(this.loggedIn){
      this._service.getProfile().subscribe((response)=>{
        console.log(response[0].status);
        this.userStatus = response[0].status;
        
        
       
        
      })

      this.loadComments();
    }
    
    this._service.getTeacherDetails(this.teacherId).subscribe(
      (data: Teacher) => {
        this.teacherDetail = data;
        this.selectedRating = this.rate ;
        this.userPreviousRate = data.user_rating;
        
        console.log(this.selectedRating);
        
      },
      (error) => {
        console.error('Error fetching teacher details:', error);
      }
    );

    


  }


  loadComments():void{
    this._service.getComments(this.teacherId).subscribe((response)=>{
      this.comments = response;
    })
  }




  rateTeacher(rating: number): void {
    this.selectedRating = this.stars.length - rating + 1;
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



  requestPrivateClass(): void {

    this._service.getUser().subscribe((response:Profile[])=>{
      const teacherList:Profile[] = response.filter(user=>user.status =='teacher')

      for(const teacher of teacherList){
        
        if(teacher.phone == this.teacherDetail.phone){
          this.sendUserId = teacher.id
          console.log(this.sendUserId);
          
          break;
  
          
        }
        
      }
      if (this.sendUserId) {
        // زمانی که sendUserId مقداردهی شد
        this.router.navigate(['/request-class'], {
          state: { teacherId: this.sendUserId },
        });
        console.log(this.sendUserId);
      } else {
        console.error('Teacher ID not found.');
        alert('Teacher not found.');
      }
      
      
      
     

    })
    



   
    
  }
  

}
