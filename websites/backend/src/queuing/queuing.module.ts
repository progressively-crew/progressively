import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { QueuingService } from './queuing.service';

@Module({
  providers: [QueuingService],
})
export class QueuingModule implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly queuingService: QueuingService) {}

  async onModuleDestroy() {
    await this.queuingService.teardown();
  }

  async onModuleInit() {
    if (this.queuingService.isQueuingReady()) {
      await this.queuingService.consume('analytics_hits', (x: object) => {
        console.log('lol', x);
      });
    }
  }
}
