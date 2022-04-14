import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectsService } from '../projects.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasProjectAccessGuard implements CanActivate {
  constructor(
    private readonly projectService: ProjectsService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const projectId = req.params.id;
    const user: UserRetrieveDTO = req.user;

    return this.projectService.hasPermissionOnProject(
      projectId,
      user.uuid,
      roles,
    );
  }
}
