import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from '../service/ProjectService';
import { ProjectCreateRequestDto } from '../dto/ProjectCreateRequestDto';
import { ProjectUpdateRequestDto } from '../dto/ProjectUpdateRequestDto';

@Controller('/api/v1/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Post()
  create(@Body() createProjectDto: ProjectCreateRequestDto) {
    return this.projectService.create(createProjectDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: ProjectUpdateRequestDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
