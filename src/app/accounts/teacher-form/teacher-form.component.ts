import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [CommonModule , FormsModule , RouterModule , RouterLink],
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

  constructor(private _service: HttpService) {}

  onSubmit() {
    
    this._service.teacherForm(this.formData).subscribe(
      (response) => {
        this.successMessage = 'Form submitted successfully!';
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error:', error);
        this.errorMessage = 'Failed to submit the form. Please check your input.';
        console.log(this.formData);
        
      }
      
    );
  }

}
