import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasScheduleAccessGuard } from './guards/hasScheduleAccess';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Delete(':scheduleId')
  @UseGuards(HasScheduleAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteSchedule(@Param('scheduleId') scheduleId: string) {
    return this.schedulingService.deleteSchedule(scheduleId);
  }
}
