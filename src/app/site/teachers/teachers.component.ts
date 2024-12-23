import { Component } from '@angular/core';
import { Teacher } from '../../model/users/teacher.model';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css'
})
export class TeachersComponent {
  teacherList : Teacher[];
  constructor(private _service : HttpService){}
  
  ngOnInit(): void {
    this._service.getTeacher().subscribe((response)=>{
      if (response.length > 3){
        this.teacherList=response.slice(0,3)
      }else{
        this.teacherList=response
      }
        

    })
    

  }
}
