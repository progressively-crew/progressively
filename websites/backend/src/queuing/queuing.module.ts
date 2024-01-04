import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { MakeQueuingService } from './queuing.service.factory';
import { IQueuingService } from './types';
import { SdkService } from '../sdk/sdk.service';
import { SdkModule } from '../sdk/sdk.module';
import { QueuedEventHit } from 'src/sdk/types';
import { KafkaTopics } from './topics';

@Module({
  imports: [SdkModule],
})
export class QueuingModule implements OnModuleInit, OnModuleDestroy {
  private queuingService: IQueuingService;

  constructor(private readonly sdkService: SdkService) {
    this.queuingService = MakeQueuingService();
  }

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }

  async onModuleInit() {
    await this.queuingService.consume<QueuedEventHit>(
      KafkaTopics.AnalyticsHits,
      (queuedEvent) => {
        this.sdkService.resolveQueuedHit(queuedEvent);
      },
    );
  }
}
