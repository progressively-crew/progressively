import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRetrieveDTO } from '../../users/users.dto';
import { SchedulingService } from '../scheduling.service';

@Injectable()
export class HasScheduleAccessGuard implements CanActivate {
  constructor(
    private readonly schedulingService: SchedulingService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const scheduleId = req.params.scheduleId;
    const user: UserRetrieveDTO = req.user;

    return this.schedulingService.hasPermissionOnSchedule(
      scheduleId,
      user.uuid,
      roles,
    );
  }
}
