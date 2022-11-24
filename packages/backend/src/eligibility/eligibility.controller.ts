import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { FlagStatus } from '../flags/flags.status';
import { HasEligibilityAccessGuard } from './guards/hasEligibilityAccess';
import { EligibilityService } from './eligibility.service';

@Controller('eligibilities')
export class EligibilityController {
  constructor(
    private readonly eligibilityService: EligibilityService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  @Delete(':eligibilityId')
  @UseGuards(HasEligibilityAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteEligibility(
    @Param('eligibilityId') eligibilityId: string,
  ): Promise<any> {
    const deletedEligibility = await this.eligibilityService.deleteEligibility(
      eligibilityId,
    );
    const flagEnv = deletedEligibility.FlagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return {
      uuid: deletedEligibility.uuid,
      name: deletedEligibility.name,
      fieldName: deletedEligibility.fieldName,
      fieldComparator: deletedEligibility.fieldComparator,
      fieldValue: deletedEligibility.fieldValue,
      flagEnvironmentFlagId: deletedEligibility.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        deletedEligibility.flagEnvironmentEnvironmentId,
    };
  }
}
