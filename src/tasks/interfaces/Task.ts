import { Document } from "mongoose";

export interface Task extends Document {
    id?: number,
    name: string,
    description: string,
    done: boolean
}