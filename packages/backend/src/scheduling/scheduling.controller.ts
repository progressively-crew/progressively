import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { UserId } from '../users/users.decorator';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasScheduleAccessGuard } from './guards/hasScheduleAccess';
import { SchedulingService } from './scheduling.service';
import { ActivityLogService } from '../activity-log/activity-log.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(
    private readonly schedulingService: SchedulingService,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Delete(':scheduleId')
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
}
