import { Profile } from "../users/profile.model";
import { Teacher } from "../users/teacher.model";

export interface PrivateClass{
    id:number;
    req:number;
    teacher:Teacher;
    user:Profile;
    pool:string;
    start_date:string;
    start_time:string;
    price:string;
    paid:boolean;
}