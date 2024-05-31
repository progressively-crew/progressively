import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FieldRecord } from '../rule/types';
import { DatabaseModule } from '../database/database.module';
import { RuleModule } from '../rule/rule.module';
import { UsersModule } from '../users/users.module';
import { KafkaTopics } from '../queuing/topics';
import { IQueuingService } from '../queuing/types';
import { QueuedEventHit } from './types';
import { QueuingModule } from '../queuing/queuing.module';
import { StrategyModule } from '../strategy/strategy.module';
import { EventsModule } from '../events/events.module';
import { CachingModule } from '../caching/caching.module';

@Module({
  controllers: [SdkController],
  imports: [
    FlagsModule,
    WebsocketModule,
    DatabaseModule,
    RuleModule,
    RuleModule,
    UsersModule,
    QueuingModule,
    StrategyModule,
    EventsModule,
    CachingModule,
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
    await this.wsGateway.teardown();
  }

  async onModuleInit() {
    this.wsGateway.registerSubscriptionHandler(
      (entity, fields: FieldRecord) => {
        return this.sdkService.resolveFlagStatusRecord(entity, fields);
      },
    );

    await this.queuingService.consume<Array<QueuedEventHit>>(
      KafkaTopics.AnalyticsHits,
      'progressively-analytics-group',
      async (queuedEvents) => {
        await this.sdkService.resolveQueuedHits(queuedEvents);
      },
    );
  }
}
