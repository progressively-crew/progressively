import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UsePipes,
  Delete,
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

    const flagId =
      updatedRule.Segment?.flagEnvironmentFlagId ||
      updatedRule.Strategy?.flagEnvironmentFlagId;

    const envId =
      updatedRule.Segment?.flagEnvironmentEnvironmentId ||
      updatedRule.Strategy?.flagEnvironmentEnvironmentId;

    await this.activityLogService.register({
      userId,
      flagId,
      envId,
      concernedEntity: 'flag',
      type: 'edit-segment-rule',
      data: JSON.stringify(updatedRule),
    });

    return updatedRule;
  }

  @Delete(':ruleId')
  @UseGuards(HasRuleAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteRule(@UserId() userId: string, @Param('ruleId') ruleId: string) {
    const deletedRule = await this.ruleService.deleteRule(ruleId);

    const flagId =
      deletedRule.Segment?.flagEnvironmentFlagId ||
      deletedRule.Strategy?.flagEnvironmentFlagId;

    const envId =
      deletedRule.Segment?.flagEnvironmentEnvironmentId ||
      deletedRule.Strategy?.flagEnvironmentEnvironmentId;

    await this.activityLogService.register({
      userId,
      flagId,
      envId,
      concernedEntity: 'flag',
      type: 'delete-rule',
      data: JSON.stringify(deletedRule),
    });

    return deletedRule;
  }
}
