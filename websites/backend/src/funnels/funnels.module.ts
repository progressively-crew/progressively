import { Module } from '@nestjs/common';
import { FunnelsService } from './funnels.service';
import { DatabaseModule } from '../database/database.module';
import { EventsModule } from '../events/events.module';
import { CachingModule } from '../caching/caching.module';

@Module({
  imports: [DatabaseModule, EventsModule, CachingModule],
  providers: [FunnelsService],
  exports: [FunnelsService],
})
export class FunnelsModule {}
