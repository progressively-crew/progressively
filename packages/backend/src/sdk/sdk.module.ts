import { Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FieldRecord } from '../strategy/types';
import { PopulatedFlagEnv } from '../flags/types';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [SdkController],
  imports: [EnvironmentsModule, FlagsModule, WebsocketModule, DatabaseModule],
  providers: [SdkService],
})
export class SdkModule implements OnModuleInit {
  constructor(
    private readonly wsGateway: WebsocketGateway,
    private readonly sdkService: SdkService,
  ) {}
  onModuleInit() {
    this.wsGateway.registerSubscriptionHandler<PopulatedFlagEnv>(
      (entity, fields: FieldRecord) => {
        return this.sdkService.resolveFlagStatusRecord(entity, fields);
      },
    );
  }
}
