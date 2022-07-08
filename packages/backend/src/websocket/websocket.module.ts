import { Module } from '@nestjs/common';
import { StrategyService } from '../strategy/strategy.service';
import { FlagsService } from '../flags/flags.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [FlagsService, PrismaService, StrategyService],
})
export class WebsocketModule {}
