import { Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FieldRecord } from '../strategy/types';
import { DatabaseModule } from '../database/database.module';
import { StrategyService } from '../strategy/strategy.service';
import { EligibilityModule } from '../eligibility/eligibility.module';
import { SchedulingModule } from '../scheduling/scheduling.module';
import { SchedulingService } from '../scheduling/scheduling.service';

@Module({
  controllers: [SdkController],
  imports: [
    EnvironmentsModule,
    FlagsModule,
    WebsocketModule,
    SchedulingModule,
    DatabaseModule,
    EligibilityModule,
  ],
  providers: [SdkService, StrategyService, SchedulingService],
})
export class SdkModule implements OnModuleInit {
  constructor(
    private readonly wsGateway: WebsocketGateway,
    private readonly sdkService: SdkService,
  ) {}
  onModuleInit() {
    this.wsGateway.registerSubscriptionHandler(
      (entity, fields: FieldRecord) => {
        return this.sdkService.resolveFlagStatusRecord(entity, fields);
      },
    );
  }
}
