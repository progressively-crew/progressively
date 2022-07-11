import {
  BadRequestException,
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
import { EnvironmentsService } from './environments.service';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { HasEnvironmentAccessGuard } from './guards/hasEnvAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { FlagAlreadyExists } from './errors';
import { FlagCreationSchema, FlagCreationDTO } from '../flags/flags.dto';
import { AbService } from '../ab/ab.service';
import {
  ExperimentCreationDTO,
  ExperimentCreationSchema,
} from '../ab/experiment.dto';
import { ExperimentAlreadyExists } from '../ab/errors';
@ApiBearerAuth()
@Controller('environments')
export class EnvironmentsController {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly abService: AbService,
  ) {}

  /**
   * Get all the flag of a given project/env (by projectId and envId)
   */
  @Get(':envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlagsByProjectAndEnv(@Param('envId') envId: string) {
    return this.envService.flagsByEnv(envId);
  }

  /**
   * Get all the experiments of a given project/env (by envId)
   */
  @Get(':envId/experiments')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getABByProjectAndEnv(@Param('envId') envId: string) {
    return this.abService.experimentsByEnv(envId);
  }

  /**
   * Create a flag on a given project/env (by projectId and envId)
   */
  @Post(':envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FlagCreationSchema))
  async createFlag(@Param('envId') envId, @Body() body: FlagCreationDTO) {
    try {
      const flag = await this.envService.createFlagEnvironment(
        envId,
        body.name,
        body.description,
      );

      return flag;
    } catch (e) {
      if (e instanceof FlagAlreadyExists) {
        throw new BadRequestException('Flag already exists');
      }

      throw e;
    }
  }

  /**
   * Create a flag on a given project/env (by projectId and envId)
   */
  @Post(':envId/experiments')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ExperimentCreationSchema))
  async createExperiments(
    @Param('envId') envId,
    @Body() body: ExperimentCreationDTO,
  ) {
    try {
      const experiment = await this.abService.createExperiment(
        envId,
        body.name,
        body.description,
      );

      return experiment;
    } catch (e) {
      if (e instanceof ExperimentAlreadyExists) {
        throw new BadRequestException('Experiment already exists');
      }

      throw e;
    }
  }

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Delete(':envId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteEnv(@Param('envId') envId: string) {
    return this.envService.deleteEnv(envId);
  }
}
