import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { EnvironmentsService } from './environments.service';
import { HasEnvironmentAccessGuard } from './guards/hasEnvAccess';
import { MetricSchema } from '../flags/flags.dto';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { MetricDto } from './types';

@ApiBearerAuth()
@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly envService: EnvironmentsService) {}

  /**
   * Get all the flag of a given project/env (by projectId and envId)
   */
  @Get(':envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlagsByProjectAndEnv(@Param('envId') envId: string) {
    return this.envService.flagsByEnv(envId);
  }

  @Get(':envId/metrics')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getMetrics(@Param('envId') envId: string) {
    return this.envService.listMetrics(envId);
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

  @Get(':envId/hits')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getmetricsByDate(
    @Param('envId') envId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const metricsPerDate = await this.envService.metricHitsPerDate(
      envId,
      startDate,
      endDate,
    );

    const metricsByVariantCount = await this.envService.metricsByVariantCount(
      envId,
      startDate,
      endDate,
    );

    return { metricsPerDate, metricsByVariantCount };
  }

  @Post(':envId/metrics')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(MetricSchema))
  async addMetricToFlag(
    @Param('envId') envId: string,
    @Body() metricDto: MetricDto,
  ) {
    const metric = await this.envService.addMetricToFlagEnv(
      envId,
      metricDto.name,
    );

    return metric;
  }

  @Delete(':envId/metrics/:metricId')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteMetricFlag(
    @Param('envId') envId: string,
    @Param('metricId') metricId: string,
  ) {
    const deletedMetric = await this.envService.deleteMetricFlag(
      envId,
      metricId,
    );

    return deletedMetric;
  }
}
