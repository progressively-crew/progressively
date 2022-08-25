import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.guard';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Delete(':scheduleId')
  @UseGuards(JwtAuthGuard)
  deleteSchedule(@Param('scheduleId') scheduleId: string): Promise<any> {
    return this.schedulingService.deleteSchedule(scheduleId);
  }
}
