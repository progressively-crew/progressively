import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FlagsService } from '../flags.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasFlagAccessGuard implements CanActivate {
  constructor(
    private readonly flagService: FlagsService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const flagId = req.params.flagId;
    const user: UserRetrieveDTO = req.user;

    return this.flagService.hasPermissionOnFlag(flagId, user.uuid, roles);
  }
}
