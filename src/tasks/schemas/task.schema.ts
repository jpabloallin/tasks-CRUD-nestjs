import { Schema } from 'mongoose';

//Esquema para la base de datos en MongoDB
export const TaskSchema = new Schema({
    name: String,
    description: String,
    done: Boolean
})