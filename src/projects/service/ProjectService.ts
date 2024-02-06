import { Injectable } from '@nestjs/common';
import { ProjectCreateRequestDto } from '../dto/ProjectCreateRequestDto';
import { ProjectUpdateRequestDto } from '../dto/ProjectUpdateRequestDto';

@Injectable()
export class ProjectService {
  create(createProjectDto: ProjectCreateRequestDto) {
    return 'This action adds a new projects';
  }

  findAll() {
    return `This action returns all project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: ProjectUpdateRequestDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
