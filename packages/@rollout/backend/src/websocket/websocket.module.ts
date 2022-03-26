import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StrategyService } from '../strategy/strategy.service';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  providers: [WebsocketGateway, StrategyService, PrismaService],
})
export class WebsocketModule {}
