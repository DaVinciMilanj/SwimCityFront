import { Profile } from "./profile.model";

export interface TeacherComment {
    id: number;
    user: Profile ;
    comment: string;
    create: string;
    report:boolean
    reply?: number;
    is_reply: boolean;
    is_reply_front : boolean ;
    replies?:TeacherComment[];
    show_replies : boolean ;
  }