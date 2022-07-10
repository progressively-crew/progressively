import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { WebsocketGateway } from './websocket.gateway';
import { StrategyModule } from '../strategy/strategy.module';
import { FlagsModule } from '../flags/flags.module';
import { AbModule } from '../ab/ab.module';

@Module({
  providers: [RedisService, WebsocketGateway],
  exports: [RedisService, WebsocketGateway],
  imports: [StrategyModule, FlagsModule, AbModule],
})
export class WebsocketModule {}
