import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterModule ],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {
  formData = {
    l_name: '',
    phone_number: '',
    massage: '',
  };

  successMessage = '';
  errorMessage = '';

  constructor(private _service: HttpService , private router: Router) {}

  onSubmit() {
    
    this._service.teacherForm(this.formData).subscribe(
      (response) => {
        this.successMessage = 'در خواست شما با موفقیت ثبت شد.';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/']); // مسیر مورد نظر خود را جایگزین کنید
        }, 2000);
      },
        
      (error) => {
        console.error('Error:', error);
        this.errorMessage = 'لطفا همه فیلد هارا پر کنید';
        console.log(this.formData);

        
      }
      
    );
  }

}
