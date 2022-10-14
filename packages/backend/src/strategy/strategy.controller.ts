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
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { StrategyCreationDTO, StrategySchema } from './strategy.dto';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagStatus } from '../flags/flags.status';

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

    const { FlagEnvironment: flagEnv } =
      await this.strategyService.getStrategyFlagEnv(stratId);

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return deletedStrategy;
  }

  @Put(':stratId')
  @UseGuards(HasStrategyAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async editStrategy(
    @Param('stratId') stratId: string,
    @Body() strategyDto: StrategyCreationDTO,
  ): Promise<any> {
    const editedStrategy = this.strategyService.editStrategy(
      stratId,
      strategyDto,
    );

    const { FlagEnvironment: flagEnv } =
      await this.strategyService.getStrategyFlagEnv(stratId);

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return editedStrategy;
  }
}
