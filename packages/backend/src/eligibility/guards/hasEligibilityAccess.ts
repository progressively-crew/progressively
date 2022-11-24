import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EligibilityService } from '../eligibility.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasEligibilityAccessGuard implements CanActivate {
  constructor(
    private readonly eligibilityService: EligibilityService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const eligibilityId = req.params.eligibilityId;
    const user: UserRetrieveDTO = req.user;

    return this.eligibilityService.hasPermissionOnEligibility(
      eligibilityId,
      user.uuid,
      roles,
    );
  }
}
