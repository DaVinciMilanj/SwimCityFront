import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgControlStatusGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Teacher } from '../../model/users/teacher.model';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { GenderPipe } from '../../pip/gender.pipe';
import { Profile } from '../../model/users/profile.model';
import { truncateSync } from 'fs';
import { log } from 'console';


@Component({
  selector: 'app-send-request-private-class',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , GenderPipe ],
  templateUrl: './send-request-private-class.component.html',
  styleUrl: './send-request-private-class.component.css'
})
export class SendRequestPrivateClassComponent {
  teacherId : number ;
  selectedTeacher : Profile ;
  privateClassForm: FormGroup;
  userStatus: any;
  teachersList : Profile[];
  poolsList : poolsEntity[];

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.httpService.getProfile().subscribe((response) => {
      this.userStatus = response[0].status;

      
      if (this.userStatus === 'teacher') {
        alert('You do not have permission to create this request.');
        this.router.navigate(['/']);
      }
    });


    this.httpService.getUser().subscribe((response : Profile[])=>{
      this.teachersList = response.filter(user => user.status =='teacher')
      if(this.teacherId){
        for(let teacher of this.teachersList){
          if(teacher.id == this.teacherId){
            this.selectedTeacher = teacher
            
          }
        }
      }
      
      
    } )
    console.log(this.teacherId);
    console.log(this.selectedTeacher);
    
    


    this.httpService.getPools().subscribe((response : poolsEntity[]) =>{
      this.poolsList = response
    } )



    this.privateClassForm = this.fb.group({
      pool: [null, Validators.required],
      teacher: ['',Validators.required],
      person: [1, [Validators.required, Validators.min(1)]],
      massage: ['', Validators.required]
    });



    const state = window.history.state;
  if (state && state.teacherId) {
    this.teacherId  = state.teacherId;
    this.privateClassForm.patchValue({ teacher: this.teacherId }); // مقداردهی اولیه به فرم
   
    
  }
  }

  
  

  // getTeacher():void{
  //   for(let teacher in this.teachersList){
  //     return;
  //   }
  // }

  onSubmit(): void {
    if (this.privateClassForm.invalid) {
      return;
    }

    this.httpService.createPrivateClassRequest(this.privateClassForm.value).subscribe(
      () => {
        alert('Request created successfully.');
        this.router.navigate(['/private-class']);
      },
      (error) => {
        console.error(error);
        alert('Failed to create request.');
      }
    );
  }

}
