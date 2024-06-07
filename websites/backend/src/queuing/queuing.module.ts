import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { MakeQueuingService } from './queuing.service.factory';
import { IQueuingService } from './types';

@Module({
  imports: [],
  providers: [
    {
      provide: 'QueueingService',
      useFactory: async () => await MakeQueuingService(),
    },
  ],
  exports: ['QueueingService'],
})
export class QueuingModule implements OnModuleDestroy {
  constructor(
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }
}
