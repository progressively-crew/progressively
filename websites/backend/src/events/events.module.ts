import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
