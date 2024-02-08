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
import { ActivityLogService } from '../activity-log/activity-log.service';
import { StrategyUpdateDto, StrategyUpdateDtoSchema } from './types';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { HasFlagAccessGuard } from '../flags/guards/hasFlagAccess';

@Controller()
export class StrategyController {
  constructor(
    private strategyService: StrategyService,
    private activityLogService: ActivityLogService,
  ) {}

  @Get('/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategies(@Param('flagId') flagId: string) {
    return this.strategyService.getStrategies(flagId);
  }

  @Post('/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async createStrategy(
    @UserId() userId: string,
    @Param('flagId') flagId: string,
  ) {
    const strategy = await this.strategyService.createStrategy(flagId);

    await this.activityLogService.register({
      userId,
      flagId: strategy.flagUuid,
      concernedEntity: 'flag',
      type: 'create-strategy',
      data: JSON.stringify(strategy),
    });

    return strategy;
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
      flagId: strategy.flagUuid,
      concernedEntity: 'flag',
      type: 'delete-strategy',
      data: JSON.stringify(strategy),
    });

    return strategy;
  }

  @Put('/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategyUpdateDtoSchema))
  async updateStrategy(
    @Param('flagId') flagId: string,
    @Body() strategiesDto: Array<StrategyUpdateDto>,
  ) {
    return await this.strategyService.upsertStrategies(flagId, strategiesDto);
  }
}
