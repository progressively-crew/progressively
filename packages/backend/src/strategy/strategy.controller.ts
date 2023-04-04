import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasStrategyAccessGuard } from './guards/hasStrategyAccess';
import { UserId } from '../users/users.decorator';
import { HasFlagEnvAccessGuard } from '../flags/guards/hasFlagEnvAccess';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Controller()
export class StrategyController {
  constructor(
    private strategyService: StrategyService,
    private activityLogService: ActivityLogService,
  ) {}

  @Post('/environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async createStrategy(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ) {
    const strategy = await this.strategyService.createStrategy(envId, flagId);

    await this.activityLogService.register({
      userId,
      flagId: strategy.flagEnvironmentFlagId,
      envId: strategy.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'create-strategy',
      data: JSON.stringify(strategy),
    });

    return strategy;
  }
}
