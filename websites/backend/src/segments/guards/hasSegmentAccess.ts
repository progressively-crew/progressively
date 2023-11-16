import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SegmentsService } from '../segments.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasSegmentAccessGuard implements CanActivate {
  constructor(
    private readonly segmentService: SegmentsService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const segmentId = req.params.segmentId;
    const user: UserRetrieveDTO = req.user;

    return this.segmentService.hasPermissionOnSegment(
      segmentId,
      user.uuid,
      roles,
    );
  }
}
