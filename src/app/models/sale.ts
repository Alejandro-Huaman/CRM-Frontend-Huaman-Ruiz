import { Customer } from "./customer";
import { User } from "./user";

export interface Sale{

    id:number;

    name:string;

    finishdate:Date;

    amount:string;

    customer:Customer;

    user:User;

    statusname:string;
    
    created_at:Date;
}