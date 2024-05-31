import { Module } from '@nestjs/common';
import { MakeCachingService } from './caching.service.factory';

@Module({
  providers: [
    {
      provide: 'CachingService',
      useFactory: MakeCachingService,
    },
  ],
  exports: ['CachingService'],
})
export class CachingModule {}
