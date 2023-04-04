import { Module } from '@nestjs/common';
import { RuleService } from './rule.service';
import { RuleController } from './rule.controller';
import { ActivityLogModule } from '../activity-log/activity-log.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, ActivityLogModule],
  providers: [RuleService],
  exports: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
