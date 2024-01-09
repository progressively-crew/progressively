import { Module } from '@nestjs/common';
import { MakeQueuingService } from './queuing.service.factory';

@Module({
  imports: [],
  providers: [
    {
      provide: 'QueueingService',
      useFactory: MakeQueuingService,
    },
  ],
  exports: ['QueueingService'],
})
export class QueuingModule {}
