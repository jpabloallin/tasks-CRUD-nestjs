import { Body, Controller, Delete, Get, Param, Post, Put, Res, Req, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/Task';
import { UpdateTaskDto } from './dto/update-task-dto';
import { response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getTasks(@Res() response): Promise<Task[]> {

    try {
      const taskData = await this.taskService.getTasks();

      return response.status(HttpStatus.OK).json({
      message: 'All tasks data found successfully',taskData,});
     } catch (err) {
      
      return response.status(err.status).json(err.response);
     }
  }

  @Get(':taskId')
  async getTask(@Res() response, @Param('taskId') taskId: string)  {
    
    try {
      const existingTask = await this.taskService.getTask(taskId);

      return response.status(HttpStatus.OK).json({
      message: 'Task found successfully',existingTask,});
   } catch (err) {

     return response.status(err.status).json(err.response);
   }
  }

  @Post()
  async createTask(@Res() response, @Body() task: CreateTaskDto): Promise<Task> {

    try {
      const newTask = await this.taskService.createTask(task);  

      return response.status(HttpStatus.CREATED).json({
        message: 'Task has been successfully created',
        newTask,});

    } catch (error) {

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Task not created!',
        error: 'Bad Request'
      });
    }
  }

  @Put(':id')
  async updateTask(@Res() response, @Body() task:UpdateTaskDto, @Param('id') id:string): Promise<Task> {
    
    try {
      const existingTask = await this.taskService.updateTask(id, task);

      return response.status(HttpStatus.OK).json({
        message: 'Task has been successfully updated',
        existingTask,});
    } catch (error) {

      return response.status(error.status).json(error.response);
    }
  }

  @Delete(':id')
  async deleteTask(@Res() response, @Param('id') id: string):Promise<Task> {

    try {
      const deletedTask = await this.taskService.deleteTask(id);

      return response.status(HttpStatus.OK).json({
      message: 'Task deleted successfully',
      deletedTask,});
    } catch (err) {

      return response.status(err.status).json(err.response);
    }
  }
}
