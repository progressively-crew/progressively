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
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import {
  FunnelCreationDTO,
  FunnelCreationSchema,
} from '../funnels/funnels.dto';

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

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Post(':envId/rotate')
  @Roles(UserRoles.Admin)
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  rotateSecretKey(@Param('envId') envId: string) {
    return this.envService.rotateSecretKey(envId);
  }

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Post(':envId/funnels')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FunnelCreationSchema))
  createFunnel(@Param('envId') envId: string, @Body() body: FunnelCreationDTO) {
    return this.envService.createFunnel(envId, body.name);
  }

  @Get(':envId/metrics/count')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getMetricCount(
    @Param('envId') envId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const metricCount = await this.envService.getMetricCount(
      envId,
      startDate,
      endDate,
    );

    const pageViewCount = await this.envService.getMetricCount(
      envId,
      startDate,
      endDate,
      'Page View',
    );

    return { metricCount, pageViewCount };
  }

  @Get(':envId/funnels')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getFunnels(
    @Param('envId') envId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    return this.envService.getFunnels(envId);
  }

  @Get(':envId/events')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getEventsByDate(
    @Param('envId') envId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const pageViewsPerDate = await this.envService.getEventsPerDate(
      envId,
      startDate,
      endDate,
      true,
    );

    const eventsPerDate = await this.envService.getEventsPerDate(
      envId,
      startDate,
      endDate,
      false,
    );

    const eventsPerDatePerOs = await this.envService.getEventsPerDatePerGroup(
      envId,
      startDate,
      endDate,
      'os',
    );

    const eventsPerDatePerBrowser =
      await this.envService.getEventsPerDatePerGroup(
        envId,
        startDate,
        endDate,
        'browser',
      );

    const eventsPerDatePerUrl = await this.envService.getEventsPerDatePerGroup(
      envId,
      startDate,
      endDate,
      'url',
    );

    const eventsPerDatePerReferer =
      await this.envService.getEventsPerDatePerGroup(
        envId,
        startDate,
        endDate,
        'referer',
      );

    const uniqueVisitors = await this.envService.getUniqueVisitor(
      envId,
      startDate,
      endDate,
    );

    const bounceRate = await this.envService.getBounceRate(
      envId,
      startDate,
      endDate,
    );

    return {
      pageViewsPerDate,
      eventsPerDate,
      eventsPerDatePerOs,
      eventsPerDatePerBrowser,
      eventsPerDatePerUrl,
      eventsPerDatePerReferer,
      uniqueVisitorsCount: uniqueVisitors.length,
      bounceRate,
    };
  }

  @Get(':envId/events/distinct')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getDistinctEventName(
    @Param('envId') envId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const distinctEvents = await this.envService.getDistinctEventName(
      envId,
      startDate,
      endDate,
    );

    return distinctEvents.map((ev) => ev.name);
  }
}
