import { HttpClient , HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
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
import { ticketEntity } from '../model/pool-model/ticket.model';
import { TeacherComment } from '../model/users/teacher-comment.model';
import { PaidEntity } from '../model/pool-model/paid.model';
import { reserveTicketEntity } from '../model/pool-model/ticketReserve.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
 

  constructor(private http : HttpClient , private router : Router) { }
  // apiBase : string = 'https://qahramananemrooz.com/api/'
  // profileUrl : string = 'https://qahramananemrooz.com/api/accounts/profile/';
   apiBase : string = 'http://127.0.0.1:8000/api/';
   profileUrl : string = 'http://127.0.0.1:8000/api/accounts/profile/';
   
  private getAuthHeaders(): HttpHeaders {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found, redirecting to login...');
        this.router.navigate(['auth/login']); 
        return new HttpHeaders(); 
      }
      return new HttpHeaders({
        'Authorization': `Token ${token}`
      });
  }



// pool service

  getPools(): Observable<poolsEntity[]> {
    return this.http.get<poolsEntity[]>(`${this.apiBase}pools/pool/`);
  }

  getPublicPools(): Observable<poolsEntity[]> {
    return this.http.get<poolsEntity[]>(`${this.apiBase}pools/public-pool/`);
  }

  getPoolDetails(poolId: number): Observable<poolsEntity> {
    return this.http.get<poolsEntity>(`${this.apiBase}pools/pool/${poolId}/`);
  }

  getPublicPoolDetails(poolId: number): Observable<poolsEntity> {
    return this.http.get<poolsEntity>(`${this.apiBase}pools/public-pool/${poolId}/`);
  }


  getPoolTicket(poolId:number):Observable<ticketEntity[]>{
    return this.http.get<ticketEntity[]>(`${this.apiBase}ticket/pool/${poolId}/tickets/`);
  }

  getTicketDetails(poolId:number , ticketId:number):Observable<ticketEntity>{
    return this.http.get<ticketEntity>(`${this.apiBase}ticket/pool/${poolId}/tickets/${ticketId}/`);
  }

  checkTicketCoupon(poolId:number, ticketId:number ,couponCode: string ):Observable<any>{
    return this.http.post(`${this.apiBase}ticket/pool/${poolId}/tickets/${ticketId}/ticket_coupon/` ,{coupon_code:couponCode})
  }
  
  reserveTicker(reserveTicket:reserveTicketEntity):Observable<any>{
    return this.http.post(`${this.apiBase}ticket/reserve-ticket/`,reserveTicket)
  }
  
  ticketPaid(payment_id:number , price:number):Observable<any>{
    return this.http.post(`${this.apiBase}ticket/paid-ticket/`,{  payment_id: payment_id,price: price})
  }

  verifyTickets(authority: string, status: string): Observable<any> {
    const params = {
      Authority: authority,
      Status: status
    };
    return this.http.get(`${this.apiBase}ticket/paid-ticket/verify/`, {

      params
    });
  }

  // course Service
  

  getCourse(poolId:number):Observable<courseEntity[]>{
    return this.http.get<courseEntity[]>(`${this.apiBase}pools/pool/${poolId}/course`);

  }

  getCourseDetails( poolId:number , courseId:number):Observable<courseEntity>{
    return this.http.get<courseEntity>(`${this.apiBase}pools/pool/${poolId}/course/${courseId}`);
  }


  
  // profile service

  getProfile(): Observable<Profile[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Profile[]>(this.profileUrl, { headers });
  }

 
  updateProfileWithImage(userId: number, formData: FormData): Observable<Profile> {
    const headers = this.getAuthHeaders(); 
    return this.http.put<Profile>(`${this.profileUrl}${userId}/`, formData, { headers });
  }
  

  // teacher service

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
  // comment Service

  getComments(teacherId: any): Observable<TeacherComment[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TeacherComment[]>(`${this.apiBase}accounts/teacher/${teacherId}/comment/` , {headers});
  }
  
  addComment(teacherId: any, comment: string): Observable<TeacherComment> {
    const headers = this.getAuthHeaders();
    const body = { comment: comment, is_reply: false };
    return this.http.post<TeacherComment>(`${this.apiBase}accounts/teacher/${teacherId}/comment/`, body, { headers });
  }


  deleteComment(teacherId: any, commentId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiBase}accounts/teacher/${teacherId}/comment/${commentId}/` , {headers});
  }
  
  reportComment(teacherId: any, commentId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}accounts/teacher/${teacherId}/comment/${commentId}/report_comment/`, {headers});
  }
  replyToComment(teacherId: number, commentId: number, replyData: any): Observable<any> {
    const  headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}accounts/teacher/${teacherId}/comment/${commentId}/reply_comment/`, replyData , {headers});
  }

  getCommentReplies(teacherId: number, commentId: number) {
    const  headers = this.getAuthHeaders();
    return this.http.get<TeacherComment[]>(`${this.apiBase}accounts/teacher/${teacherId}/comment/${commentId}/get_reply_comment/` , {headers});
  }


  // private class service



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

  paidCourse(poolId:number , couseId:number , price:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/pool/${poolId}/course/${couseId}/paid/`,{price : price},{ headers });
  }
  paidCourseWithPrice(poolId:number , couseId:number , price:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/pool/${poolId}/course/${couseId}/paid/`,{price : price} ,{ headers } );
  }

  paidPrivateClass(price:number , private_class_pk:number):Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiBase}pools/paid-private-class/`,{price : price , private_class_pk:private_class_pk},{ headers });
  }

  verifyPaidPrivateClass(authority: string, status: string): Observable<any>{
    const headers = this.getAuthHeaders();
    const params = {
      Authority: authority,
      Status: status
    };
    return this.http.get(`${this.apiBase}pools/paid-private-class/verify/`, {
      headers,
      params
    });

  }

  myCourse():Observable<MyCourse[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<MyCourse[]>(`${this.apiBase}pools/my-course/`,{headers})
  }

  verifyPaidCourse(poolId: number, courseId: number, authority: string, status: string): Observable<any> {
    const headers = this.getAuthHeaders();
    const params = {
      Authority: authority,
      Status: status
    };
    return this.http.get(`${this.apiBase}pools/pool/${poolId}/course/${courseId}/paid/verify/`, {
      headers,
      params
    });
  }

  myPaid(authority: string): Observable<PaidEntity> {
    const headers = this.getAuthHeaders();
    const params = new HttpParams().set('authority', authority);
    return this.http.get<PaidEntity>(`${this.apiBase}my-paid/`, { headers, params });
  }



} 
