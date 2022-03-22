import { Module } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';
import { PrismaService } from '../prisma.service';
import { StrategyController } from './strategy.controller';
import { StrategyService } from './strategy.service';

@Module({
  controllers: [StrategyController],
  providers: [PrismaService, StrategyService, ProjectsService],
  exports: [StrategyService],
})
export class StrategyModule {}
