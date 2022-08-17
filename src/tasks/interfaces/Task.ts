import { Document } from "mongoose";

//Atributos de task and tipos 
export interface Task extends Document {
    id?: number,
    name: string,
    description: string,
    done: boolean
}