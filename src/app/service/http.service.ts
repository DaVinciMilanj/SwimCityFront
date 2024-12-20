import { HttpClient , HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { poolsEntity } from '../model/pool-model/pools.model';
import { Profile } from '../model/users/profile.model';
import { courseEntity } from '../model/pool-model/course.model';
import { Teacher } from '../model/users/teacher.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 

  constructor(private http : HttpClient , private router : Router) { }
  apiBase : string = 'http://127.0.0.1:8000/'

  profileUrl : string = 'http://127.0.0.1:8000/accounts/profile/';


  getPools(): Observable<poolsEntity[]> {
    return this.http.get<poolsEntity[]>(`${this.apiBase}pools/pool/`);
  }


  

  getCourse(poolId:number):Observable<courseEntity[]>{
    return this.http.get<courseEntity[]>(`${this.apiBase}pools/pool/${poolId}/course`);

  }


  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found, redirecting to login...');
      this.router.navigate(['/login']); // هدایت کاربر به صفحه ورود
      return new HttpHeaders(); // بازگشت یک هدر خالی
    }
    return new HttpHeaders({
      'Authorization': `Token ${token}`
    });
  }

  getProfile(): Observable<Profile[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Profile[]>(this.profileUrl, { headers });
  }

 
  updateProfileWithImage(userId: number, formData: FormData): Observable<Profile> {
    const headers = this.getAuthHeaders(); 
    return this.http.put<Profile>(`${this.profileUrl}${userId}/`, formData, { headers });
  }
  

  getTeacher(): Observable<Teacher[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Teacher[]>(`${this.apiBase}accounts/teacher/` , {headers});
  }

  getTeacherDetails(id: number): Observable<Teacher> {
    const headers = this.getAuthHeaders();
    return this.http.get<Teacher>(`${this.apiBase}accounts/teacher/${id}/` , {headers});
  }
  rateTeacher(id: number, rate: number): Observable<any> {
    const headers = this.getAuthHeaders(); // باید توکن معتبر ارسال شود
    return this.http.post(`${this.apiBase}accounts/teacher/${id}/rate/`, { rate }, { headers });
  }


  teacherForm(formData:FormData):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}accounts/teacher-form/` , {formData} ,{headers})
  }
  

}
