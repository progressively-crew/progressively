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

@ApiBearerAuth()
@Controller('strategies')
export class StrategyController {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  @Get(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategy(@Param('stratId') stratId: string): Promise<any> {
    return this.strategyService.getStrategy(stratId);
  }

  @Delete(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteStrategy(@Param('stratId') stratId: string): Promise<any> {
    const deletedStrategy = await this.strategyService.deleteStrategy(stratId);
    const flagEnv = deletedStrategy.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return {
      uuid: deletedStrategy.uuid,
      fieldName: deletedStrategy.fieldName,
      fieldComparator: deletedStrategy.fieldComparator,
      fieldValue: deletedStrategy.fieldValue,
      flagEnvironmentFlagId: deletedStrategy.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        deletedStrategy.flagEnvironmentEnvironmentId,
    };
  }

  @Put(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async updateEligibility(
    @Param('eligibilityId') stratId: string,
    @Body() strategyDto: StrategyUpdateDTO,
  ): Promise<any> {
    const updatedEligibility = await this.strategyService.updateStrategy(
      stratId,
      strategyDto,
    );

    const flagEnv = updatedEligibility.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return {
      uuid: updatedEligibility.uuid,
      fieldName: updatedEligibility.fieldName,
      fieldComparator: updatedEligibility.fieldComparator,
      fieldValue: updatedEligibility.fieldValue,
      valueToServe: updatedEligibility.valueToServe,
      valueToServeType: updatedEligibility.valueToServeType,
      flagEnvironmentFlagId: updatedEligibility.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        updatedEligibility.flagEnvironmentEnvironmentId,
    };
  }
}
