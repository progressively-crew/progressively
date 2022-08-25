import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { StrategyService } from '../strategy/strategy.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { SchedulingService } from '../scheduling/scheduling.service';

@Module({
  imports: [EnvironmentsModule, WebsocketModule, DatabaseModule],
  providers: [FlagsService, StrategyService, SchedulingService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
