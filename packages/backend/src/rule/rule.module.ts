import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';

@Module({
  providers: [RuleService],
})
export class RuleModule {}
