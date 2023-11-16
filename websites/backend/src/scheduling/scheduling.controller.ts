import {
  Controller,
  Delete,
  Param,
  UseGuards,
  Get,
  Body,
  Post,
  UsePipes,
} from '@nestjs/common';
import { UserId } from '../users/users.decorator';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasScheduleAccessGuard } from './guards/hasScheduleAccess';
import { SchedulingService } from './scheduling.service';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { HasFlagEnvAccessGuard } from '../flags/guards/hasFlagEnvAccess';
import { SchedulingCreationDTO, SchedulingSchema } from './types';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';

@Controller()
export class SchedulingController {
  constructor(
    private readonly schedulingService: SchedulingService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Get('environments/:envId/flags/:flagId/scheduling')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getScheduling(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ) {
    return this.schedulingService.listScheduling(envId, flagId);
  }

  @Delete('/scheduling/:scheduleId')
  @UseGuards(HasScheduleAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteSchedule(
    @UserId() userId: string,
    @Param('scheduleId') scheduleId: string,
  ) {
    const deletedSchedule = await this.schedulingService.deleteSchedule(
      scheduleId,
    );

    await this.activityLogService.register({
      userId,
      flagId: deletedSchedule.flagEnvironmentFlagId,
      envId: deletedSchedule.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'delete-scheduling',
      data: JSON.stringify(deletedSchedule),
    });

    return deletedSchedule;
  }

  @Post('environments/:envId/flags/:flagId/scheduling')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SchedulingSchema))
  async addSchedulingToFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() schedulingDto: SchedulingCreationDTO,
  ) {
    const scheduling = await this.schedulingService.addSchedulingToFlagEnv(
      envId,
      flagId,
      schedulingDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'create-scheduling',
      data: JSON.stringify(scheduling),
    });

    return scheduling;
  }
}
