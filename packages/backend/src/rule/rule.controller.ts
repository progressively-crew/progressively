import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';
import { RuleService } from './rule.service';
import { HasRuleAccessGuard } from './guards/hasRuleAccess';
import { RuleSchema, RuleType } from './types';

@Controller('rules')
export class RuleController {
  constructor(
    private readonly ruleService: RuleService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Put(':ruleId')
  @UseGuards(HasRuleAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(RuleSchema))
  async updateRule(
    @UserId() userId: string,
    @Param('ruleId') ruleId: string,
    @Body() ruleDto: RuleType,
  ) {
    const updatedRule = await this.ruleService.editRule(ruleId, ruleDto);

    await this.activityLogService.register({
      userId,
      flagId: updatedRule.Segment.flagEnvironmentFlagId,
      envId: updatedRule.Segment.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'edit-segment-rule',
      data: JSON.stringify(updatedRule),
    });

    return updatedRule;
  }
}
