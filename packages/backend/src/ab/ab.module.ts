import { Module } from '@nestjs/common';
import { AbController } from './ab.controller';
import { AbService } from './ab.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [EnvironmentsModule, WebsocketModule, DatabaseModule],
  controllers: [AbController],
  providers: [AbService],
  exports: [AbService],
})
export class AbModule {}
