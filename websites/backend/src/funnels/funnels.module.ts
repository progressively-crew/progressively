import { Module } from '@nestjs/common';
import { FunnelsService } from './funnels.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [FunnelsService],
  exports: [FunnelsService],
})
export class FunnelsModule {}
