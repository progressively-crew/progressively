import { Module } from '@nestjs/common';
import { MakePubsubService } from './pubsub.service.factory';

@Module({
  providers: [
    {
      provide: 'PubsubService',
      useFactory: MakePubsubService,
    },
  ],
  exports: ['PubsubService'],
})
export class PubsubModule {}
