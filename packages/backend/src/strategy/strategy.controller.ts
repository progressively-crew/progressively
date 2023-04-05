import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  Get,
} from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasStrategyAccessGuard } from './guards/hasStrategyAccess';
import { UserId } from '../users/users.decorator';
import { HasFlagEnvAccessGuard } from '../flags/guards/hasFlagEnvAccess';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { StrategyUpdateDto } from './types';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';

@Controller()
export class StrategyController {
  constructor(
    private strategyService: StrategyService,
    private activityLogService: ActivityLogService,
  ) {}

  @Get('/environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategies(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ) {
    return this.strategyService.getStrategies(envId, flagId);
  }

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

  @Post('/strategies/:strategyId/rules')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  createStrategyRule(
    @UserId() userId: string,
    @Param('strategyId') strategyId: string,
  ) {
    return this.strategyService.createStrategyRule(strategyId);
  }

  @Delete('/strategies/:strategyId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteStrategy(
    @UserId() userId: string,
    @Param('strategyId') strategyId: string,
  ) {
    const strategy = await this.strategyService.deleteStrategy(strategyId);

    await this.activityLogService.register({
      userId,
      flagId: strategy.flagEnvironmentFlagId,
      envId: strategy.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'delete-strategy',
      data: JSON.stringify(strategy),
    });

    return strategy;
  }

  @Put('/strategies/:strategyId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategyUpdateDto))
  async updateStrategy(
    @UserId() userId: string,
    @Param('strategyId') strategyId: string,
    @Body() strategyDto: StrategyUpdateDto,
  ) {
    const strategy = await this.strategyService.updateStrategy(
      strategyId,
      strategyDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: strategy.flagEnvironmentFlagId,
      envId: strategy.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'edit-strategy',
      data: JSON.stringify(strategy),
    });

    return strategy;
  }
}
