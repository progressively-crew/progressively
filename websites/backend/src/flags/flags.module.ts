import { Inject, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { FlagsService } from './flags.service';
import { FlagsController } from './flags.controller';
import { WebsocketModule } from '../websocket/websocket.module';
import { DatabaseModule } from '../database/database.module';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { RuleModule } from '../rule/rule.module';
import { WebhooksModule } from '../webhooks/webhooks.module';
import { IQueuingService } from '../queuing/types';
import { KafkaTopics } from '../queuing/topics';
import { QueuedFlagHit } from './types';
import { QueuingModule } from '../queuing/queuing.module';
import { CachingModule } from '../caching/caching.module';

@Module({
  imports: [
    WebsocketModule,
    DatabaseModule,
    ActivityLogModule,
    RuleModule,
    WebhooksModule,
    ActivityLogModule,
    QueuingModule,
    CachingModule,
  ],
  providers: [FlagsService],
  controllers: [FlagsController],
  exports: [FlagsService],
})
export class FlagsModule implements OnModuleInit {
  constructor(
    private readonly flagService: FlagsService,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async onModuleInit() {
    await this.queuingService.consume<QueuedFlagHit>(
      KafkaTopics.FlagHits,
      'progressively-flags-hits-group',
      async (queuedFlagHit) => {
        await this.flagService.hitFlag(queuedFlagHit);
      },
    );
  }
}
