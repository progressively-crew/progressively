import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { PubsubModule } from '../pubsub/pubsub.module';

@Module({
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
  imports: [PubsubModule],
})
export class WebsocketModule {}
