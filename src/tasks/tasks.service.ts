import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/Task';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {

    // Constructor para la injección del modelo de Mongo llamado Task
    constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

    //Método para obtener tareas
    async getTasks() {
        return await this.taskModel.find();
    }

    //Método para obtener una tarea por id
    async getTask(id:string) {
        return await this.taskModel.findById(id);
    }

    //Método para crear una tarea
    async createTask(task: CreateTaskDto) {
        const newTask = new this.taskModel(task)
        return await newTask.save();
    }

    //Método para eliminar una tarea
    deleteTask(id:string) {
        return this.taskModel.findByIdAndDelete(id);
    }

    //Método para actualizar una tarea
    async updateTask(id:string, task: CreateTaskDto) {
        return await this.taskModel.findByIdAndUpdate(id, task);
    }

}
