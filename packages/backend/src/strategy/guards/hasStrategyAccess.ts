import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRetrieveDTO } from '../../users/users.dto';
import { StrategyService } from '../strategy.service';

@Injectable()
export class HasStrategyAccessGuard implements CanActivate {
  constructor(
    private readonly strategyService: StrategyService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const strategyId = req.params.strategyId;
    const user: UserRetrieveDTO = req.user;

    return this.strategyService.hasPermissionOnStrategy(
      strategyId,
      user.uuid,
      roles,
    );
  }
}
