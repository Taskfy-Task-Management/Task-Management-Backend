import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(data: { name: string; description: string; userId: number }) {
    return this.prisma.project.create({ data });
  }

  async getAllProjects(userId: number) {
    return this.prisma.project.findMany({ where: { userId }, include: { tasks: true } });
  }

  async getProjectById(projectId: number) {
    return this.prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });
  }

  async updateProject(projectId: number, data: { name?: string; description?: string }) {
    return this.prisma.project.update({ where: { id: projectId }, data });
  }

  async deleteProject(projectId: number) {
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}
