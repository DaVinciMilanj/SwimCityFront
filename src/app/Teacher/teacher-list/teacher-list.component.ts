import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../model/users/teacher.model';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {
  allTeacher : Teacher[];
  constructor(private _service:HttpService){}

  ngOnInit(): void {
    this._service.getTeacher().subscribe((response)=>{
      this.allTeacher = response

    })
  }

  


}
