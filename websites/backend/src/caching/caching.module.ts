import { Inject, Module, OnModuleDestroy } from '@nestjs/common';
import { MakeCachingService } from './caching.service.factory';
import { ICachingService } from './types';

@Module({
  providers: [
    {
      provide: 'CachingService',
      useFactory: MakeCachingService,
    },
  ],
  exports: ['CachingService'],
})
export class CachingModule implements OnModuleDestroy {
  constructor(
    @Inject('CachingService') private readonly cachingService: ICachingService,
  ) {}

  async onModuleDestroy() {
    await this.cachingService.teardown();
  }
}
