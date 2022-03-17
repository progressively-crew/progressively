import { Controller, Get, Param, Request } from '@nestjs/common';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagStatus } from './flags.status';
import { StrategyService } from '../strategy/strategy.service';
import { UserRetrieveDTO } from '../users/users.dto';
import { FlagsService } from './flags.service';

@Controller('flags')
export class FlagsController {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly strategyService: StrategyService,
    private readonly flagService: FlagsService,
  ) {}

  @Get('sdk/:clientKey')
  async getByClientKey(@Request() req, @Param('clientKey') clientKey: string) {
    const user: UserRetrieveDTO = req.user;
    const flagEnvs = await this.envService.getEnvironmentByClientKey(clientKey);

    const dictOfFlags = {};

    // TODO: make sure to run these with Promise.all when confident enough
    for (const flagEnv of flagEnvs) {
      dictOfFlags[flagEnv.flag.key] =
        flagEnv.status === FlagStatus.ACTIVATED
          ? await this.strategyService.resolveStrategies(
              flagEnv,
              user?.uuid || '',
            )
          : false;

      await this.flagService.hitFlag(
        flagEnv.environmentId,
        flagEnv.flagId,
        flagEnv.status as FlagStatus,
      );
    }

    return dictOfFlags;
  }
}
