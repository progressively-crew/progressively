import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { EnvironmentsModule } from '../environments/environments.module';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { RuleModule } from '../rule/rule.module';
import { SchedulingModule } from '../scheduling/scheduling.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { IQueuingService } from '../queuing/types';
import { KafkaTopics } from '../queuing/topics';
import { QueuedFlagHit } from './types';
import { QueuingModule } from '../queuing/queuing.module';

@Module({
  imports: [
    EnvironmentsModule,
    WebsocketModule,
    DatabaseModule,
    ActivityLogModule,
    RuleModule,
    SchedulingModule,
    WebhooksModule,
    ActivityLogModule,
    QueuingModule,
  ],
  providers: [FlagsService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly flagService: FlagsService,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }

  async onModuleInit() {
    await this.queuingService.consume<QueuedFlagHit>(
      KafkaTopics.FlagHits,
      (queuedFlagHit) => {
        this.flagService.hitFlag(queuedFlagHit);
      },
    );
  }
}
