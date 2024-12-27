import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

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

  async deleteTask(taskId: number) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  async getTasksByProject(projectId: number) {
    return this.prisma.task.findMany({
        where: { projectId },
        include: { user: true }, 
    });
  }

}
