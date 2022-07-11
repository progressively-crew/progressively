import { Module } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { PrismaService } from '../prisma.service';
import { FlagsController } from './flags.controller';
import { StrategyService } from '../strategy/strategy.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [EnvironmentsModule, WebsocketModule],
  providers: [PrismaService, FlagsService, StrategyService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule {}
