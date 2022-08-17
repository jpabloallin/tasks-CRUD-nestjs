import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './interfaces/Task';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';

@Injectable()
export class TasksService {

    // Constructor para la injección del modelo de Mongo llamado Task
    constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

    //Método para obtener tareas
    async getTasks() {
        const taskData = await this.taskModel.find();

        if(!taskData || taskData.length === 0) {
            throw new NotFoundException('There are not tasks!');
        }
        return taskData;
    }

    //Método para obtener una tarea por id
    async getTask(id:string) {
        const existingTask = await this.taskModel.findById(id);

        if (!existingTask) {
            throw new NotFoundException(`Task #${id} not found`);
        }
        return existingTask;
    }

    //Método para crear una tarea
    async createTask(task: CreateTaskDto) {
        const newTask = new this.taskModel(task)
        return await newTask.save();
    }

    //Método para eliminar una tarea
    async deleteTask(id:string) {
        const deletedTask = await this.taskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            throw new NotFoundException(`Task #${id} not found`);
        }
        return deletedTask;
    }

    //Método para actualizar una tarea
    async updateTask(id:string, task: UpdateTaskDto) {
        const existingTask = await this.taskModel.findByIdAndUpdate(id, task, {
            new: true });

        if (!existingTask) {
            throw new NotFoundException(`Task #${id} not found`);
        }
        return existingTask;
    }

}
