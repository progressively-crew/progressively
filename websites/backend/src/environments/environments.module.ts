import { Module } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { DatabaseModule } from '../database/database.module';
import { FunnelsModule } from '../funnels/funnels.module';

@Module({
  imports: [DatabaseModule, FunnelsModule],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
