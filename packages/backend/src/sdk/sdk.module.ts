import { Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { AbModule } from '../ab/ab.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagsService } from '../flags/flags.service';
import { AbService } from '../ab/ab.service';
import { FieldRecord } from '../strategy/types';
import { PopulatedExperimentEnv } from '../ab/types';
import { PopulatedFlagEnv } from '../flags/types';

@Module({
  controllers: [SdkController],
  imports: [EnvironmentsModule, FlagsModule, AbModule, WebsocketModule],
  providers: [SdkService],
})
export class SdkModule implements OnModuleInit {
  constructor(
    private readonly wsGateway: WebsocketGateway,
    private readonly flagService: FlagsService,
    private readonly abService: AbService,
  ) {}
  onModuleInit() {
    // Register a callback when an even is subscribed in redis. The goal is to dispatch the update A/B experiment
    // and flags update to the client.
    // Defining it here allows to remove the ABService and FlagService dependencies from the websocket gateway
    // and so, avoiding circular references since wsGateway is used in AB and Flags module
    this.wsGateway.registerSubscriptionHandler<
      PopulatedExperimentEnv | PopulatedFlagEnv
    >((entity, fields: FieldRecord) => {
      if (entity._type === 'Flag') {
        return this.flagService.resolveFlagStatusRecord(entity, fields);
      }

      if (entity._type === 'Experiment') {
        return this.abService.resolveExperimentVariantValue(entity, fields);
      }

      return undefined;
    });
  }
}
