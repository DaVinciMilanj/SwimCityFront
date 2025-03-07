import { Teacher } from "../users/teacher.model";

export interface courseEntity{
    id:number ,
    code : any ,
    pool:string,
    teacher:Teacher,
    start:string,
    end:string,
    start_clock:string,
    end_clock:string,
    price:number,
    discount:number,
    total_price:number,
    limit_register : number,
    register_count : number

}