import { Module } from '@nestjs/common';
import { MakePubsubService } from './pubsub.service.factory';

@Module({
  providers: [
    {
      provide: 'PubsubService',
      useFactory: MakePubsubService,
    },
  ],
})
export class PubsubModule {}
