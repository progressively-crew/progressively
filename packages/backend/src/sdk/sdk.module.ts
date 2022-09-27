import { Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagsService } from '../flags/flags.service';
import { FieldRecord } from '../strategy/types';
import { PopulatedFlagEnv } from '../flags/types';

@Module({
  controllers: [SdkController],
  imports: [EnvironmentsModule, FlagsModule, WebsocketModule],
  providers: [SdkService],
})
export class SdkModule implements OnModuleInit {
  constructor(
    private readonly wsGateway: WebsocketGateway,
    private readonly flagService: FlagsService,
  ) {}
  onModuleInit() {
    this.wsGateway.registerSubscriptionHandler<PopulatedFlagEnv>(
      (entity, fields: FieldRecord) => {
        const flagStatusRecord = this.flagService.resolveFlagStatus(
          entity,
          fields,
          {},
        );

        return {
          [entity.flag.key]: flagStatusRecord,
        };
      },
    );
  }
}
