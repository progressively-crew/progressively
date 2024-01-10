import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FieldRecord } from '../rule/types';
import { DatabaseModule } from '../database/database.module';
import { SchedulingModule } from '../scheduling/scheduling.module';
import { RuleModule } from '../rule/rule.module';
import { UsersModule } from '../users/users.module';
import { KafkaTopics } from '../queuing/topics';
import { IQueuingService } from '../queuing/types';
import { QueuedEventHit } from './types';
import { QueuingModule } from '../queuing/queuing.module';

@Module({
  controllers: [SdkController],
  imports: [
    EnvironmentsModule,
    FlagsModule,
    WebsocketModule,
    SchedulingModule,
    DatabaseModule,
    RuleModule,
    RuleModule,
    UsersModule,
    QueuingModule,
  ],
  providers: [SdkService],
  exports: [SdkService],
})
export class SdkModule implements OnModuleInit {
  constructor(
    private readonly wsGateway: WebsocketGateway,
    private readonly sdkService: SdkService,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }

  async onModuleInit() {
    this.wsGateway.registerSubscriptionHandler(
      (entity, fields: FieldRecord) => {
        return this.sdkService.resolveFlagStatusRecord(entity, fields);
      },
    );

    await this.queuingService.consume<QueuedEventHit>(
      KafkaTopics.AnalyticsHits,
      'progressively-analytics-group',
      async (queuedEvent) => {
        await this.sdkService.resolveQueuedHit(queuedEvent);
      },
    );
  }
}
