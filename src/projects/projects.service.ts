import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * ProjectsService handles operations related to managing projects,
 * including creation, retrieval, updating, and deletion.
 */
@Injectable()
export class ProjectsService {
  /**
   * Constructor for ProjectsService.
   * @param prisma - PrismaService instance for database operations.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new project in the database.
   * 
   * @param data - An object containing the project's name, description, and userId.
   * @returns The created project object.
   */
  async createProject(data: { name: string; description: string; userId: number }) {
    return this.prisma.project.create({ data });
  }

  /**
   * Retrieves all projects associated with a specific user.
   * 
   * @param userId - The ID of the user whose projects are being retrieved.
   * @returns An array of project objects, each including associated tasks.
   */
  async getAllProjects(userId: number) {
    return this.prisma.project.findMany({ where: { userId }, include: { tasks: true } });
  }

  /**
   * Retrieves details of a specific project by its ID.
   * 
   * @param projectId - The ID of the project to retrieve.
   * @returns The project object, including associated tasks.
   */
  async getProjectById(projectId: number) {
    return this.prisma.project.findUnique({
      where: { id: projectId },
      include: { tasks: true },
    });
  }

  /**
   * Updates an existing project in the database.
   * 
   * @param projectId - The ID of the project to update.
   * @param data - An object containing the updated name and/or description.
   * @returns The updated project object.
   */
  async updateProject(projectId: number, data: { name?: string; description?: string }) {
    return this.prisma.project.update({ where: { id: projectId }, data });
  }

  /**
   * Deletes a project from the database.
   * 
   * @param projectId - The ID of the project to delete.
   * @returns The deleted project object.
   */
  async deleteProject(projectId: number) {
    return this.prisma.project.delete({ where: { id: projectId } });
  }
}
