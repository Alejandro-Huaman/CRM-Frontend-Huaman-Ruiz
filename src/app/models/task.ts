import { Sale } from "./sale";

export interface Task{

    id:number;

    title:string;

    date:Date;

    description:string;

    inithour:string;

    finalhour:string;

    sale:Sale
}