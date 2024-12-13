import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute } from '@angular/router';
import { courseEntity } from '../../model/pool-model/course.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule , HttpClientModule],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  courses: courseEntity[] = [];
  poolId: number | undefined;

  constructor(private http:HttpService , private route: ActivatedRoute) {}

  ngOnInit() {
    // دریافت poolId از URL
    this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));

    if (this.poolId) {
      // فراخوانی API برای دریافت دوره‌های استخر
      this.http.getCourse(this.poolId).subscribe((data: courseEntity[]) => {
        
        this.courses = data;
        
        
      });
    }
  }

}
