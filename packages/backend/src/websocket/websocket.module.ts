import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { WebsocketGateway } from './websocket.gateway';
import { StrategyModule } from '../strategy/strategy.module';

@Module({
  providers: [RedisService, WebsocketGateway],
  exports: [RedisService, WebsocketGateway],
  imports: [StrategyModule],
})
export class WebsocketModule {}
