import { poolsEntity } from "./pools.model";

export interface ticketEntity{
    id:number;
    pool : number;
    description : string;
    price : number ;
    discount_amount : number ;
    final_price : number ;
}