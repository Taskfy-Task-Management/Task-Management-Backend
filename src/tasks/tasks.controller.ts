import { Controller, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Delete, Param, Get } from '@nestjs/common';


@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async createTask(
    @Body()
    body: {
      title: string;
      description: string;
      status: string;
      priority: string;
      deadline: Date;
      userId: number;
      projectId: number;
    },
  ) {
    return this.tasksService.createTask(body);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(Number(taskId));
  }

  @Get('project/:projectId')
  async getTasksByProject(@Param('projectId') projectId: string) {
    return this.tasksService.getTasksByProject(Number(projectId));
  }
}
