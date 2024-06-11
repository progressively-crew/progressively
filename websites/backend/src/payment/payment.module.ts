import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseModule } from '../database/database.module';
import { ProjectsModule } from '../projects/projects.module';
import { IQueuingService } from '../queuing/types';
import { KafkaTopics } from '../queuing/topics';
import { QueuedPayingHit } from './types';
import { CachingModule } from '../caching/caching.module';
import { QueuingModule } from '../queuing/queuing.module';

@Module({
  imports: [DatabaseModule, ProjectsModule, CachingModule, QueuingModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule implements OnModuleInit {
  constructor(
    private readonly paymentService: PaymentService,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async onModuleInit() {
    await this.queuingService.consume<QueuedPayingHit>(
      KafkaTopics.PayingHits,
      'progressively-paying-hits-group',
      async (queuedEvent) => {
        await this.paymentService.decreaseAvailableCreditsById(
          queuedEvent.projectUuid,
          queuedEvent.reduceBy,
        );
      },
    );
  }
}
