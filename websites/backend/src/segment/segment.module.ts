import { Module } from '@nestjs/common';
import { SegmentService } from './segment.service';
import { SegmentController } from './segment.controller';
import { DatabaseModule } from '../database/database.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  providers: [SegmentService],
  controllers: [SegmentController],
  imports: [DatabaseModule, ProjectsModule],
})
export class SegmentModule {}
