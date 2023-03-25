import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { StrategyService } from './strategy.service';
import { HasStrategyAccessGuard } from './guards/hasStrategyAccess';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagStatus } from '../flags/flags.status';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { StrategyUpdateDTO, StrategySchema } from './types';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';
import { ComparatorEnum } from '../rule/comparators/types';

@ApiBearerAuth()
@Controller('strategies')
export class StrategyController {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly wsGateway: WebsocketGateway,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Get(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategy(@Param('stratId') stratId: string) {
    return this.strategyService.getStrategy(stratId);
  }

  @Delete(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteStrategy(
    @UserId() userId: string,
    @Param('stratId') stratId: string,
  ) {
    const deletedStrategy = await this.strategyService.deleteStrategy(stratId);
    const flagEnv = deletedStrategy.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    const strat = {
      uuid: deletedStrategy.uuid,
      rule: {
        fieldComparator: deletedStrategy.rule.fieldComparator as ComparatorEnum,
        fieldName: deletedStrategy.rule.fieldName,
        fieldValue: deletedStrategy.rule.fieldValue,
      },
      flagEnvironmentFlagId: deletedStrategy.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        deletedStrategy.flagEnvironmentEnvironmentId,
    };

    await this.activityLogService.register({
      userId,
      flagId: deletedStrategy.flagEnvironmentFlagId,
      envId: deletedStrategy.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'delete-additional-audience',
      data: JSON.stringify(deletedStrategy),
    });

    return strat;
  }

  @Put(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async updateStrategy(
    @UserId() userId: string,
    @Param('stratId') stratId: string,
    @Body() strategyDto: StrategyUpdateDTO,
  ) {
    const updatedEligibility = await this.strategyService.updateStrategy(
      stratId,
      strategyDto,
    );

    const flagEnv = updatedEligibility.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    const strat = {
      uuid: updatedEligibility.uuid,
      rule: {
        fieldComparator: updatedEligibility.rule
          .fieldComparator as ComparatorEnum,
        fieldName: updatedEligibility.rule.fieldName,
        fieldValue: updatedEligibility.rule.fieldValue,
      },
      valueToServe: updatedEligibility.valueToServe,
      valueToServeType: updatedEligibility.valueToServeType,
      flagEnvironmentFlagId: updatedEligibility.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        updatedEligibility.flagEnvironmentEnvironmentId,
    };

    await this.activityLogService.register({
      userId,
      flagId: strat.flagEnvironmentFlagId,
      envId: strat.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'edit-additional-audience',
      data: JSON.stringify(strat),
    });

    return strat;
  }
}
