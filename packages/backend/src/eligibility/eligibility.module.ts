import { Module } from '@nestjs/common';
import { EligibilityService } from './eligibility.service';

@Module({
  providers: [EligibilityService]
})
export class EligibilityModule {}
