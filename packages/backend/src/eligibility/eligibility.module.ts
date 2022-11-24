import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { EligibilityService } from './eligibility.service';
import { EligibilityController } from './eligibility.controller';

@Module({
  imports: [DatabaseModule, WebsocketModule],
  providers: [EligibilityService],
  controllers: [EligibilityController],
  exports: [EligibilityService],
})
export class EligibilityModule {}
