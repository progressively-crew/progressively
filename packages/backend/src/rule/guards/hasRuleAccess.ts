import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RuleService } from '../rule.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasRuleAccessGuard implements CanActivate {
  constructor(
    private readonly ruleService: RuleService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const ruleId = req.params.ruleId;
    const user: UserRetrieveDTO = req.user;

    return this.ruleService.hasPermissionOnRule(ruleId, user.uuid, roles);
  }
}
