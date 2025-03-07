import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../model/users/teacher.model';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../site/footer/footer.component";
import { NavbarComponent } from "../../site/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { FilterTeacherPipe } from '../../pip/filter-teacher.pipe';



@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule  ,FilterTeacherPipe],
  templateUrl: './teacher-list.component.html',
  styleUrl: './teacher-list.component.css'
})
export class TeacherListComponent implements OnInit {
  searchTerm : string = '';
  stars : number[] = [1 ,2 ,3 ,4 ,5]
  allTeacher : Teacher[] ;
  constructor(private _service:HttpService){}

  ngOnInit(): void {
    this._service.getTeacher().subscribe((response:Teacher[])=>{
      
      console.log(response);
      
      
      this.allTeacher = response
  
    })
  }

  


}
