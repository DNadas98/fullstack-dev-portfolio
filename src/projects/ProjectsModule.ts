import { Module } from '@nestjs/common';
import { ProjectService } from './service/ProjectService';
import { ProjectController } from './controller/ProjectController';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectsModule {}
