import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { ActivityLogModule } from '../activity-log/activity-log.module';

@Module({
  imports: [ActivityLogModule],
  providers: [RuleService],
  exports: [RuleService],
  controllers: [],
})
export class RuleModule {}
