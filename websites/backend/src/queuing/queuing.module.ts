import { Module } from '@nestjs/common';
import { MakeQueuingService } from './queuing.service.factory';

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
export class QueuingModule {}
