import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { EnvironmentsService } from './environments.service';
import { HasEnvironmentAccessGuard } from './guards/hasEnvAccess';

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

    const eventsPerDate = await this.envService.getEventsPerDate(
      envId,
      startDate,
      endDate,
    );

    return { eventsPerDate, metricsHitsPerDate: [] };
  }
}
