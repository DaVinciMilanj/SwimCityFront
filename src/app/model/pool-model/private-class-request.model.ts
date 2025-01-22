import { Profile } from "../users/profile.model";
import { Teacher } from "../users/teacher.model";
import { poolsEntity } from "./pools.model";

export interface privateClassRequestEntity{
    id:number;
    user : Profile;
    teacher : Teacher;
    pool : poolsEntity;
    person : number ;
    massage : string ;
    acceptation  : boolean ;
   
}