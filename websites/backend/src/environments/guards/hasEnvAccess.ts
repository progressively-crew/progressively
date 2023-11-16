import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EnvironmentsService } from '../environments.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasEnvironmentAccessGuard implements CanActivate {
  constructor(
    private readonly envService: EnvironmentsService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const envId = req.params.envId;
    const user: UserRetrieveDTO = req.user;

    return this.envService.hasPermissionOnEnv(envId, user.uuid, roles);
  }
}
