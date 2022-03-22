import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { ProjectsService } from '../projects/projects.service';

@Module({
  controllers: [EnvironmentsController],
  providers: [PrismaService, EnvironmentsService, ProjectsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
