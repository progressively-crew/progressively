import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { StrategySchema, StrategyCreateDTO } from './strategy.dto';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { StrategyService } from './strategy.service';
import { HasFlagAccessGuard } from '../flags/guards/hasFlagAccess';

@ApiBearerAuth()
@Controller()
export class StrategyController {
  constructor(private readonly strategyService: StrategyService) {}

  @Post('projects/:id/environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async addStrategyToProject(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() strategyDto: StrategyCreateDTO,
  ): Promise<any> {
    return this.strategyService.addStrategyToFlagEnv(
      envId,
      flagId,
      strategyDto,
    );
  }

  @Get('projects/:id/environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getStrategies(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.strategyService.listStrategies(envId, flagId);
  }

  @Get('projects/:id/environments/:envId/flags/:flagId/strategies/:stratId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getStrategy(@Param('stratId') stratId: string): Promise<any> {
    return this.strategyService.getStrategy(stratId);
  }

  @Delete('projects/:id/environments/:envId/flags/:flagId/strategies/:stratId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteStrategy(@Param('stratId') stratId: string): Promise<any> {
    return this.strategyService.deleteStrategy(stratId);
  }
}
