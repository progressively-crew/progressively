import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagStatus } from '../flags/flags.status';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';
import { ComparatorEnum } from '../rule/comparators/types';

@Controller('rule')
export class RuleController {
  constructor(
    private readonly schedulingService: SchedulingService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Put(':segmentId')
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
