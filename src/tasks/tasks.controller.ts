import { Body, Controller, Delete, Get, Param, Post, Put, Res, Req } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { request, response } from 'express';
import { TasksService } from './tasks.service';
import { Task } from './interfaces/Task';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {

    return this.taskService.getTasks();
  }

  @Get(':taskId')
  getTask(@Param('taskId') taskId: string)  {
    
    return this.taskService.getTask( taskId );
  }

  @Post()
  createTask(@Body() task: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  updateTask(@Body() task:CreateTaskDto, @Param('id') id:string): Promise<Task> {
    
    return this.taskService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {

    console.log(`Deleting task ${id}`);
    return this.taskService.deleteTask( id );
  }
}
