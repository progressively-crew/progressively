import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EnvironmentsService } from './environments.service';
import { EnvironmentsController } from './environments.controller';
import { AbModule } from '../ab/ab.module';

@Module({
  imports: [AbModule],
  controllers: [EnvironmentsController],
  providers: [PrismaService, EnvironmentsService],
  exports: [EnvironmentsService],
})
export class EnvironmentsModule {}
