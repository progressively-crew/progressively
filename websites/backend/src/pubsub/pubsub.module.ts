import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { MakePubsubService } from './pubsub.service.factory';
import { IPubsubService } from './types';

@Module({
  providers: [
    {
      provide: 'PubsubService',
      useFactory: MakePubsubService,
    },
  ],
  exports: ['PubsubService'],
})
export class PubsubModule implements OnModuleDestroy {
  constructor(
    @Inject('PubsubService') private readonly pubsubService: IPubsubService,
  ) {}

  async onModuleDestroy() {
    await this.pubsubService.teardown();
  }
}
