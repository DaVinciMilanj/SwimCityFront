import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { courseEntity } from '../../model/pool-model/course.model';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { SearchTablePipe } from '../../pip/search-table.pipe';
import { FormsModule } from '@angular/forms';
import { FilterCoursePricePipe } from '../../pip/filter-course-price.pipe';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, HttpClientModule, CommonModule, SearchTablePipe, FormsModule ,FilterCoursePricePipe  ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit {
  courses: courseEntity[];
  filteredCourses: courseEntity[];
  pool: poolsEntity;
  poolId: number ;
  searchText: string = '';
  sortOrder : string = '' ;

  // Pagination variables
  displayedCourses: courseEntity[];
  currentPage: number = 0;
  pageSize: number = 4; // تعداد سطرها در هر صفحه
  totalPages: number = 0;

  constructor(private http: HttpService, private route: ActivatedRoute ,private router : Router) {}

  ngOnInit() {
    this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));

    if (this.poolId) {
      // دریافت داده‌ها
      this.http.getCourse(this.poolId).subscribe((data: courseEntity[]) => {
        this.courses = data;
        
        this.filteredCourses = [...this.courses]; // کپی داده‌ها
        this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize); // تعداد صفحات
        this.updateDisplayedCourses();
      });

      this.http.getPoolDetails(this.poolId).subscribe((res) => {
        this.pool = res;
        
      });
    }
  }

  // به‌روزرسانی سطرهای جدول برای صفحه‌بندی
  updateDisplayedCourses() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedCourses = this.filteredCourses.slice(startIndex, endIndex);
  }

  // تغییر صفحه
  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedCourses();
  }

  // جستجو
  onSearch() {
    const searchLowerCase = this.searchText.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.teacher.toLowerCase().includes(searchLowerCase) || 
      course.id.toString().includes(this.searchText)
    );
    this.currentPage = 0; // بازگشت به صفحه اول
    this.totalPages = Math.ceil(this.filteredCourses.length / this.pageSize);
    this.updateDisplayedCourses();
  }


  courseDetail(courseId:number){
    
    this.router.navigate(['/pools', this.poolId, 'course', courseId]);
    

  }
}


