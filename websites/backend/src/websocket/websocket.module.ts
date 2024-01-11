import { Module } from '@nestjs/common';
import { RedisService } from '../pubsub/concrete/redis.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [RedisService, WebsocketGateway],
  exports: [RedisService, WebsocketGateway],
  imports: [],
})
export class WebsocketModule {}
