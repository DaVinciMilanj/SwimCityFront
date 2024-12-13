import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activeRoute : ActivatedRoute , private _service:HttpService , private authService : AuthService){}

  teacherId : number;
  teacherDeatail : Teacher;
  loggedIn : boolean = false;



  ngOnInit(): void {
    this.teacherId = this.activeRoute.snapshot.params['teacherId'];
    this.loggedIn = this.authService.isLoggedIn();
    this._service.getTeacherDetails(this.teacherId).subscribe(
      (data: Teacher) => {
        this.teacherDeatail = data;
      },
      (error) => {
        console.error('Error fetching teacher details:', error);
      }
    );
    
  }
  

}
