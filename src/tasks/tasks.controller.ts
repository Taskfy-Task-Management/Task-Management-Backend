import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

/**
 * TasksController handles HTTP requests related to task management,
 * including creating, retrieving, and deleting tasks.
 */
@Controller('tasks')
export class TasksController {
  /**
   * Constructor for TasksController.
   * @param tasksService - The TasksService instance for handling task-related business logic.
   */
  constructor(private tasksService: TasksService) {}

  /**
   * Creates a new task associated with a specific project.
   * 
   * @route POST /tasks
   * @param body - An object containing task details: title, description, status, 
   * priority, deadline, userId, and projectId.
   * @returns The newly created task object.
   */
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

  /**
   * Deletes a task by its ID.
   * 
   * @route DELETE /tasks/:id
   * @param taskId - The ID of the task to delete.
   * @returns The deleted task object.
   */
  @Delete(':id')
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(Number(taskId));
  }

  /**
   * Retrieves all tasks associated with a specific project.
   * 
   * @route GET /tasks/project/:projectId
   * @param projectId - The ID of the project whose tasks are being retrieved.
   * @returns An array of task objects, each including associated user details.
   */
  @Get('project/:projectId')
  async getTasksByProject(@Param('projectId') projectId: string) {
    return this.tasksService.getTasksByProject(Number(projectId));
  }
}
