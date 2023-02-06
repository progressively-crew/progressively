import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { FlagStatus } from '../flags/flags.status';
import { HasEligibilityAccessGuard } from './guards/hasEligibilityAccess';
import { EligibilityService } from './eligibility.service';
import { EligibilitySchema, EligibilityUpdateDTO } from './types';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';

@Controller('eligibilities')
export class EligibilityController {
  constructor(
    private readonly eligibilityService: EligibilityService,
    private readonly wsGateway: WebsocketGateway,
    private readonly activityLogService: ActivityLogService,
  ) {}

  @Put(':eligibilityId')
  @UseGuards(HasEligibilityAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(EligibilitySchema))
  async updateEligibility(
    @Param('eligibilityId') eligibilityId: string,
    @Body() eligibilityDto: EligibilityUpdateDTO,
  ) {
    const updatedEligibility = await this.eligibilityService.updateEligibility(
      eligibilityId,
      eligibilityDto,
    );

    const flagEnv = updatedEligibility.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return {
      uuid: updatedEligibility.uuid,
      fieldName: updatedEligibility.fieldName,
      fieldComparator: updatedEligibility.fieldComparator,
      fieldValue: updatedEligibility.fieldValue,
      flagEnvironmentFlagId: updatedEligibility.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        updatedEligibility.flagEnvironmentEnvironmentId,
    };
  }

  @Delete(':eligibilityId')
  @UseGuards(HasEligibilityAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteEligibility(
    @UserId() userId: string,
    @Param('eligibilityId') eligibilityId: string,
  ) {
    const deletedEligibility = await this.eligibilityService.deleteEligibility(
      eligibilityId,
    );
    const flagEnv = deletedEligibility.flagEnvironment;

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    await this.activityLogService.register({
      userId,
      flagId: flagEnv.flagId,
      envId: flagEnv.environmentId,
      concernedEntity: 'flag',
      type: 'delete-eligibility',
      data: JSON.stringify(deletedEligibility),
    });

    return {
      uuid: deletedEligibility.uuid,
      fieldName: deletedEligibility.fieldName,
      fieldComparator: deletedEligibility.fieldComparator,
      fieldValue: deletedEligibility.fieldValue,
      flagEnvironmentFlagId: deletedEligibility.flagEnvironmentFlagId,
      flagEnvironmentEnvironmentId:
        deletedEligibility.flagEnvironmentEnvironmentId,
    };
  }
}
