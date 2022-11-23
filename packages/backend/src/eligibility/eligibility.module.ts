import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { EligibilityService } from './eligibility.service';

@Module({
  imports: [DatabaseModule, WebsocketModule],
  providers: [EligibilityService],
})
export class EligibilityModule {}
