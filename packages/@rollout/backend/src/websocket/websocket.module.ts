import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { StrategyService } from '../strategy/strategy.service';

@Module({
  providers: [StrategyService, PrismaService],
})
export class WebsocketModule {}
