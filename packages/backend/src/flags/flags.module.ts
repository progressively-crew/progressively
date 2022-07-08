import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { PrismaService } from '../prisma.service';
import { FlagsController } from './flags.controller';
import { EnvironmentsService } from '../environments/environments.service';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { StrategyService } from '../strategy/strategy.service';
import { RedisService } from '../websocket/redis.service';
import { AbService } from '../ab/ab.service';

@Module({
  providers: [
    PrismaService,
    WebsocketGateway,
    FlagsService,
    EnvironmentsService,
    StrategyService,
    RedisService,
    AbService,
  ],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
