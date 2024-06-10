import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from '../database/database.module';
import { CachingModule } from '../caching/caching.module';

@Module({
  imports: [DatabaseModule, CachingModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
