import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StrategyService } from '../strategy.service';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class HasStrategyAccessGuard implements CanActivate {
  constructor(
    private readonly strategyService: StrategyService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();

    const stratId = req.params.stratId;
    const user: UserRetrieveDTO = req.user;

    return this.strategyService.hasPermissionOnStrategy(
      stratId,
      user.uuid,
      roles,
    );
  }
}
