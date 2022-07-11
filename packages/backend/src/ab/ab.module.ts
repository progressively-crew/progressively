import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [EnvironmentsModule, WebsocketModule],
  controllers: [AbController],
  providers: [AbService, PrismaService],
  exports: [AbService],
})
export class AbModule {}
