
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-create-private-class',
  standalone: true,
  imports: [FormsModule , RouterModule , RouterLink],
  templateUrl: './create-private-class.component.html',
  styleUrl: './create-private-class.component.css'
})
export class CreatePrivateClassComponent implements OnInit {
  requestId:number ;
  userId:number;
  constructor(private route:ActivatedRoute , private _service:HttpService , private router :Router){}
  ngOnInit(): void {
    this.requestId = Number(this.route.snapshot.paramMap.get('requestId'))
    const state = window.history.state;
    if (state && state.userId) {
      this.userId  = state.userId;
    } 
  }
  convertDateFormat(date: string): string {
    if (!date) return '';
    return date.replace(/\//g, '-'); // جایگزینی `/` با `-`
  }
  


  onSubmit(form: any): void {
    if (form.valid) {
      const formData = {
        class_requested: this.requestId,
        user: this.userId,
        start_date: this.convertDateFormat(form.value.startDate),
        start_time: form.value.startTime,
        price: form.value.price,
       
      };


      this._service.createPrivateClass(formData).subscribe(
        (response) => {
          alert('Class created successfully!');
          this.router.navigate(['/private-class']);
        },
        (error) => console.error('Error creating class:', error)
      );
    }
    
  }

 
  


}
