import { Component, OnInit } from '@angular/core';
import { TeacherComment } from '../../model/users/teacher-comment.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { response } from 'express';

@Component({
  selector: 'app-teacher-comment',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './teacher-comment.component.html',
  styleUrl: './teacher-comment.component.css'
})
export class TeacherCommentComponent implements OnInit {
constructor(private activeRoute : ActivatedRoute , private _service:HttpService ,
     private authService : AuthService,private router: Router ){}

  myID : number ;
  teacherId : number;
  userStatus : any ;
  comments: TeacherComment[] = [];
  myComment : TeacherComment[] ;
  newComment: string = '';
  loggedIn : boolean = false;
  reply : boolean = false
  isReported : boolean = false
  isReplying: boolean = false;
  replyText: string = "";  
  repComment:TeacherComment | null = null;
  visibleReplies: { [commentId: number]: number } = {};
 



ngOnInit(): void {
    this.teacherId = this.activeRoute.snapshot.params['teacherId'];
    this.loggedIn = this.authService.isLoggedIn();
    
    if(this.loggedIn){
      this.getStatus()
      this.loadComments();

    }
  }

  loadComments():void{
    this._service.getComments(this.teacherId).subscribe((response)=>{
      console.log(response);
      
      this.comments = response.filter(comment => comment.is_reply === false);
      for(let comment of this.comments){
        comment.replies = response.filter(reply => reply.is_reply === true && reply.reply === comment.id);     }
      this.getMyComment();
    })
  }

  getStatus(){
    this._service.getProfile().subscribe((response)=>{
      console.log(response[0].status);
      this.userStatus = response[0].status;  
      this.myID = response[0].id 
    })
  }

  addComment(): void {
    if (!this.newComment.trim()) return;

    this._service.addComment(this.teacherId, this.newComment).subscribe(comment => {
      console.log(comment);
      
      this.comments.unshift(comment);
      this.newComment = '';
      window.location.reload();
    });
  }
  
  getMyComment(){

    if (this.myID) {
      
      this.myComment = this.comments.filter(comment => comment.user.id === this.myID);
      this.comments = this.comments.filter(comment => comment.user.id !== this.myID);
  
      console.log("My Comments:", this.myComment);
      console.log("Other Comments:", this.comments);
    }
  }

  

  toggleReply(commentID: number) {
    this.repComment = this.comments.find(comment => comment.id === commentID) || 
                      this.myComment.find(comment => comment.id === commentID) || 
                      null;
    
    if (this.repComment) {
      this.repComment.is_reply_front = !this.repComment.is_reply_front;  // مقدار را برعکس کن
      console.log("Toggled is_reply_front:", this.repComment.is_reply_front);
    } else {
      console.log("Comment not found!");
    }
  }

  submitReply(replyingTo:number): void {
    // if (!this.replyText.trim() || replyingTo === null) return;
    const replyData = {
      comment: this.replyText,
      reply: replyingTo,
      is_reply: true
    };
    console.log(replyData);
    
  
    this._service.replyToComment(this.teacherId, replyingTo, replyData).subscribe(
      (response) => {

        console.log("Reply sent successfully:", response);
        this.replyText = "";
        window.location.reload();

        
      },
      (error) => {
        console.error("Error replying to comment:", error);
      }
    );
  }








  DeleteComment(commentId: number): void {
    this._service.deleteComment(this.teacherId , commentId).subscribe((response)=>{
      window.location.reload();
    });
  }
  
  reportComment(commentId:number){
    this._service.reportComment(this.teacherId , commentId).subscribe((response)=>{
      window.location.reload();
    })

  }



  getReplies(commentId: number): void {
    this._service.getCommentReplies(this.teacherId, commentId).subscribe(
      (replies) => {
        const replyComment = this.comments.find(comment => comment.id === commentId) || 
        this.myComment.find(comment => comment.id === commentId) || 
        null;
        console.log('show me',replyComment);

        if(replyComment){
          replyComment.replies = replies;
          replyComment.show_replies = !replyComment.show_replies;
          console.log('repo',replyComment);
          this.visibleReplies[commentId] = 1;
          // this.toggelReplyShow(replyComment);
        }
        console.log(`Replies for comment ${commentId}:`, replies);
      },
      (error) => {
        console.error("Error fetching replies:", error);
      }
    );
  }

  

  showMoreReplies(commentId: number): void {
    if (this.visibleReplies[commentId] !== undefined) {
      this.visibleReplies[commentId] += 3;
    }
  }







}
