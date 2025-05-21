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
import { MyCourse } from '../../model/pool-model/my-course.model';
import { AuthService } from '../../service/auth.service';
import { Meta, Title } from '@angular/platform-browser';

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
  myCourse : MyCourse[];
  loggedIn : boolean;
  myID : number;
  // Pagination variables
  displayedCourses: courseEntity[];
  currentPage: number = 0;
  pageSize: number = 4; // تعداد سطرها در هر صفحه
  totalPages: number = 0;
  userStatus : any ;

  constructor(private http: HttpService, private authService : AuthService ,private route: ActivatedRoute ,private router : Router
    , private title: Title, private meta: Meta
  ) {}

  ngOnInit() {
    this.poolId = Number(this.route.snapshot.paramMap.get('poolId'));
    this.loggedIn = this.authService.isLoggedIn()
    if (this.poolId) {
      
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
      if (this.loggedIn) {
      this.http.getProfile().subscribe((response)=>{
        console.log(response[0].status);
        this.userStatus = response[0].status;
        
        
       
        
      })  
    }

    if (this.userStatus != 'teacher'){
      this.http.myCourse().subscribe((response) => {
        this.myCourse = response;
        console.log(this.myCourse);
        this.updateMyCourses();
    });
    }


    this.title.setTitle(`${this.pool.name} |آموزش شنا در بهترین مجموعه`);

    this.meta.updateTag({
      name: 'description',
      content: `اطلاعات کامل درباره ${this.pool.name} در مشهد - امکانات، سانس‌ها، آدرس و رزرو آنلاین.`
    });

    
    
  }

  updateMyCourses() {
    if (this.myCourse && this.courses) {
        this.myCourse.forEach((course) => {
            const matchedCourse = this.courses.find(cls => cls.id === course.course.id);
            if (matchedCourse) {
                this.myID = matchedCourse.id;
                console.log(course.course.id);
            }
        });
    }
  }

  

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

  // // جستجو
  onSearch() {
    const searchLowerCase = this.searchText.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.teacher.last_name.toLowerCase().includes(searchLowerCase) || 
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


