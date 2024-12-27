import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';

/**
 * ProjectsController handles HTTP requests for managing projects,
 * including creating, retrieving, updating, and deleting projects.
 */
@Controller('projects')
export class ProjectsController {
  /**
   * Constructor for ProjectsController.
   * @param projectsService - The ProjectsService instance for handling business logic.
   */
  constructor(private projectsService: ProjectsService) {}

  /**
   * Creates a new project.
   * 
   * @route POST /projects
   * @param body - An object containing the project's name, description, and userId.
   * @returns The newly created project object.
   */
  @Post()
  async createProject(@Body() body: { name: string; description: string; userId: number }) {
    return this.projectsService.createProject(body);
  }

  /**
   * Retrieves all projects for a specific user.
   * 
   * @route GET /projects/:userId
   * @param userId - The ID of the user whose projects are being retrieved.
   * @returns An array of project objects, each including associated tasks.
   */
  @Get(':userId')
  async getAllProjects(@Param('userId') userId: string) {
    return this.projectsService.getAllProjects(Number(userId));
  }

  /**
   * Retrieves details of a specific project by its ID.
   * 
   * @route GET /projects/details/:projectId
   * @param projectId - The ID of the project to retrieve.
   * @returns The project object, including associated tasks.
   */
  @Get('details/:projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    return this.projectsService.getProjectById(Number(projectId));
  }

  /**
   * Updates an existing project.
   * 
   * @route PUT /projects/:projectId
   * @param projectId - The ID of the project to update.
   * @param body - An object containing the updated name and/or description.
   * @returns The updated project object.
   */
  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.projectsService.updateProject(Number(projectId), body);
  }

  /**
   * Deletes a project.
   * 
   * @route DELETE /projects/:projectId
   * @param projectId - The ID of the project to delete.
   * @returns No content (HTTP 204) if successful.
   */
  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProject(@Param('projectId') projectId: string) {
    return this.projectsService.deleteProject(Number(projectId));
  }
}
