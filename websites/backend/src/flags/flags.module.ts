import { Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
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
import { MakeQueuingService } from '../queuing/queuing.service.factory';

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
  ],
  providers: [FlagsService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule implements OnModuleInit, OnModuleDestroy {
  private queuingService: IQueuingService;

  constructor(private readonly flagService: FlagsService) {
    this.queuingService = MakeQueuingService();
  }

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }

  async onModuleInit() {
    await this.queuingService.consume<QueuedFlagHit>(
      KafkaTopics.FlagHits,
      (queuedFlagHit) => {
        console.log('WTF');
        this.flagService.hitFlag(queuedFlagHit);
      },
    );
  }
}
