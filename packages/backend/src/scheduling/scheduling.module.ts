import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SchedulingController],
  providers: [SchedulingService],
})
export class SchedulingModule {}
