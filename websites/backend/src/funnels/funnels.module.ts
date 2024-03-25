import { Module } from '@nestjs/common';
import { FunnelsService } from './funnels.service';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [DatabaseModule, EventsModule],
  providers: [FunnelsService],
  exports: [FunnelsService],
})
export class FunnelsModule {}
