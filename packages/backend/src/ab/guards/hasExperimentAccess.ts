import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRetrieveDTO } from '../../users/users.dto';
import { AbService } from '../ab.service';

@Injectable()
export class HasExperimentAccess implements CanActivate {
  constructor(
    private readonly abService: AbService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const experimentId = req.params.experimentId;
    const user: UserRetrieveDTO = req.user;

    return this.abService.hasPermissionOnExperiment(
      experimentId,
      user.uuid,
      roles,
    );
  }
}
