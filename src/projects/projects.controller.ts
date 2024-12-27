import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  async createProject(@Body() body: { name: string; description: string; userId: number }) {
    return this.projectsService.createProject(body);
  }

  @Get(':userId')
  async getAllProjects(@Param('userId') userId: string) {
    return this.projectsService.getAllProjects(Number(userId));
  }

  @Get('details/:projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    return this.projectsService.getProjectById(Number(projectId));
  }

  @Put(':projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() body: { name?: string; description?: string },
  ) {
    return this.projectsService.updateProject(Number(projectId), body);
  }

  @Delete(':projectId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProject(@Param('projectId') projectId: string) {
    return this.projectsService.deleteProject(Number(projectId));
  }
}
