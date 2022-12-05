import { Sale } from "./sale";

export interface Task{

    id:number;

    title:string;

    date:string;

    description:string;

    sale:Sale
}