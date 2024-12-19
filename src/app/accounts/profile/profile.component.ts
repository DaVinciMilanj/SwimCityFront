import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Profile } from '../../model/users/profile.model';
import { HttpService } from '../../service/http.service';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule , CommonModule  , ReactiveFormsModule   ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileData: Profile[]; 
  selectedFile: File | null = null; // متغیر برای ذخیره فایل

  constructor(private profileService: HttpService , private cdr: ChangeDetectorRef , private route : Router , private authService : AuthService ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]; // ذخیره فایل انتخاب شده
    }
  }

  ngOnInit(): void {
    this.getProfileData();
    console.log(this.profileData)
  }

  getProfileData(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.cdr.detectChanges();
        console.log(this.profileData);
        
        
      },
      error: (err) => console.error('Error fetching profile data:', err)
    });
  }
  updateProfile(): void {
    if (this.profileData && this.profileData[0]) {
      const userId: number = this.profileData[0].id;
  
      const formData = new FormData();
      formData.append('username' , this.profileData[0].username)
      formData.append('phone' , this.profileData[0].phone)
      formData.append('code_meli', this.profileData[0].code_meli || '');
      formData.append('first_name', this.profileData[0].first_name || '');
      formData.append('last_name', this.profileData[0].last_name || '');
      formData.append('email', this.profileData[0].email || '');
      formData.append('birthday', this.profileData[0].birthday || '');
      formData.append('gender', this.profileData[0].gender || '');
  
     
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
  
      this.profileService.updateProfileWithImage(userId, formData).subscribe({
        next: (updatedProfile) => {
          this.profileData[0] = updatedProfile;
          console.log('Profile updated successfully:', updatedProfile);
          this.route.navigate(['/profile'])
          
          
        },
        error: (err) => console.error('خطا در به‌روزرسانی پروفایل:', err),
      });
      
      
    }
  }
  onLogout(): void {
    this.authService.logout();
  }
  
  
  
}
