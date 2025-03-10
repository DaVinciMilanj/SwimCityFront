import { HttpClient , HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { poolsEntity } from '../model/pool-model/pools.model';
import { Profile } from '../model/users/profile.model';
import { courseEntity } from '../model/pool-model/course.model';
import { Teacher } from '../model/users/teacher.model';
import { Router } from '@angular/router';
import { privateClassRequestEntity } from '../model/pool-model/private-class-request.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { PrivateClass } from '../model/pool-model/private-class.model';
import { MyCourse } from '../model/pool-model/my-course.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 

  constructor(private http : HttpClient , private router : Router) { }
  apiBase : string = 'https://qahramananemrooz.com/'

  profileUrl : string = 'https://qahramananemrooz.com/accounts/profile/';


  getPools(): Observable<poolsEntity[]> {
    return this.http.get<poolsEntity[]>(`${this.apiBase}pools/pool/`);
  }

  getPoolDetails(poolId: number): Observable<poolsEntity> {
    return this.http.get<poolsEntity>(`${this.apiBase}pools/pool/${poolId}/`);
  }

  

  getCourse(poolId:number):Observable<courseEntity[]>{
    return this.http.get<courseEntity[]>(`${this.apiBase}pools/pool/${poolId}/course`);

  }

  getCourseDetails( poolId:number , courseId:number):Observable<courseEntity>{
    return this.http.get<courseEntity>(`${this.apiBase}pools/pool/${poolId}/course/${courseId}`);
  }


  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No token found, redirecting to login...');
      this.router.navigate(['auth/login']); 
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
    // const headers = this.getAuthHeaders();
    return this.http.get<Teacher[]>(`${this.apiBase}accounts/teacher/`);
  }

  getTeacherDetails(id: number): Observable<Teacher> {
    // const headers = this.getAuthHeaders();
    return this.http.get<Teacher>(`${this.apiBase}accounts/teacher/${id}/` );
  }
  rateTeacher(id: number, rate: number): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.post(`${this.apiBase}accounts/teacher/${id}/rate/`, { rate }, { headers });
  }


  teacherForm(form:any):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}accounts/teacher-form/` , form , { headers })
  }
  


  privateClassShow():Observable<privateClassRequestEntity[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<privateClassRequestEntity[]>(`${this.apiBase}pools/private-class/` , { headers })
  }

  privateClassDetails(id:number):Observable<privateClassRequestEntity>{
    const headers = this.getAuthHeaders();
    return this.http.get<privateClassRequestEntity>(`${this.apiBase}pools/private-class/${id}/` , { headers })
  }

  acceptRequest(requestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiBase}pools/private-class/${requestId}/accept/`,null ,{headers});
  }
  rejectRequest(requestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch(`${this.apiBase}pools/private-class/${requestId}/reject/`,null ,{headers});
  }

  getUser():Observable<Profile[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<Profile[]>(`${this.apiBase}accounts/users`,{headers})
  }


  deleteRequest(requestId:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiBase}pools/private-class/${requestId}/` , {headers})
  }

  createPrivateClassRequest(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/private-class/`, data, { headers });
  }


  createPrivateClass(data :any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/create-private-class/` , data , {headers})
  }
  showUserPrivateClass(): Observable<PrivateClass[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<PrivateClass[]>(`${this.apiBase}pools/create-private-class/` ,{headers})
  }

  checkCoupon(couponCode: string , courseId: number,  poolId:number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/pool/${poolId}/course/${courseId}/check_coupon/`, { coupon_code: couponCode }, { headers });
  }

  paidCourse(poolId:number , couseId:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}/pools/pool/1/course/1/paid/`,{},{ headers });
  }
  paidCourseWithPrice(poolId:number , couseId:number , price:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}/pools/pool/${poolId}/course/${couseId}/paid/`,{price} ,{ headers } );
  }

  myCourse():Observable<MyCourse[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<MyCourse[]>(`${this.apiBase}/pools/my-course/`,{headers})
  }

}
