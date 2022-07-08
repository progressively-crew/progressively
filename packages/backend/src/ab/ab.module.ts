import { Module } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { EnvironmentsService } from '../environments/environments.service';
import { PrismaService } from '../prisma.service';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { StrategyService } from '../strategy/strategy.service';
import { RedisService } from '../websocket/redis.service';

@Module({
  controllers: [AbController],
  providers: [
    AbService,
    PrismaService,
    WebsocketGateway,
    EnvironmentsService,
    StrategyService,
    RedisService,
  ],
  exports: [AbService],
})
export class AbModule {}
