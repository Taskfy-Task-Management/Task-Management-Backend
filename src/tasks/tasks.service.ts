import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * TasksService handles operations related to task management,
 * including creating, retrieving, and deleting tasks.
 */
@Injectable()
export class TasksService {
  /**
   * Constructor for TasksService.
   * @param prisma - PrismaService instance for database operations.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new task associated with a specific project.
   * 
   * @param data - An object containing task details: title, description, status,
   * priority, deadline, userId, and projectId.
   * @returns The created task object.
   * @throws Error if the project associated with the task does not exist.
   */
  async createTask(data: {
    title: string;
    description: string;
    status: string;
    priority: string;
    deadline: Date;
    userId: number;
    projectId: number;
  }) {
    const projectExists = await this.prisma.project.findUnique({
      where: { id: data.projectId },
    });
    if (!projectExists) {
      throw new Error('Project not found');
    }
    return this.prisma.task.create({ data });
  }

  /**
   * Deletes a task by its ID.
   * 
   * @param taskId - The ID of the task to delete.
   * @returns The deleted task object.
   */
  async deleteTask(taskId: number) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  /**
   * Retrieves all tasks associated with a specific project.
   * 
   * @param projectId - The ID of the project whose tasks are being retrieved.
   * @returns An array of task objects, including user details for each task.
   */
  async getTasksByProject(projectId: number) {
    return this.prisma.task.findMany({
      where: { projectId },
      include: { user: true }, // Includes details of the user who created the task
    });
  }
}
