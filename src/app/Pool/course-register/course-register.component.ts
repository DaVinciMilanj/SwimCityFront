import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute } from '@angular/router';
import { courseEntity } from '../../model/pool-model/course.model';
import { CommonModule, formatNumber } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-register',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './course-register.component.html',
  styleUrl: './course-register.component.css'
})
export class CourseRegisterComponent implements OnInit {
  constructor(private _sevice : HttpService , private route : ActivatedRoute){}
  poolId:number;
  courseId:number;
  courseDetails:courseEntity;
  couponCode: string ;
  discount: number | null = null;
  finalPrice: number | null = null;
  errorMessage: string = '';

  ngOnInit(){
    this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    this._sevice.getCourseDetails(this.poolId ,this.courseId).subscribe((response:courseEntity)=>{
      this.courseDetails = response;
      console.log(this.courseDetails);
      
    })
  }

  applyCoupon() {
    if (!this.couponCode.trim()) {
      this.errorMessage = 'لطفاً کد تخفیف را وارد کنید.';
      return;
    }

    this._sevice.checkCoupon(this.couponCode, this.courseId, this.poolId).subscribe(
      (response) => {
        this.discount = response.discount;
        this.finalPrice = response.final_price;
        this.errorMessage = ''; 
      },
      (error) => {
        this.discount = null;
        this.finalPrice = null;
        this.errorMessage = error.error?.error || 'خطایی رخ داده است.';
      }
    );
  }

}
