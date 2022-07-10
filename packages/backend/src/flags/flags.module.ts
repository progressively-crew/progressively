import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { PrismaService } from '../prisma.service';
import { FlagsController } from './flags.controller';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { StrategyService } from '../strategy/strategy.service';
import { RedisService } from '../websocket/redis.service';
import { AbService } from '../ab/ab.service';
import { EnvironmentsModule } from '../environments/environments.module';

// TODO: websocketgateway circular deps
@Module({
  imports: [EnvironmentsModule],
  providers: [
    PrismaService,
    WebsocketGateway,
    FlagsService,
    StrategyService,
    RedisService,
    AbService,
  ],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
