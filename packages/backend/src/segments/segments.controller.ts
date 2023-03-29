import {
  Body,
  Controller,
  Param,
  Get,
  Put,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasSegmentAccessGuard } from './guards/hasSegmentAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { UserId } from '../users/users.decorator';
import { SegmentCreationDTO, SegmentSchema } from './types';
import { SegmentsService } from './segments.service';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { RuleSchema, RuleType } from '../rule/types';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FlagStatus } from '../flags/flags.status';

@Controller('segments')
export class SegmentsController {
  constructor(
    private readonly segmentService: SegmentsService,
    private readonly activityLogService: ActivityLogService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  @Get(':segmentId')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategy(@Param('segmentId') segmentId: string) {
    return this.segmentService.getSegment(segmentId);
  }

  @Put(':segmentId')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SegmentSchema))
  async updateStrategy(
    @UserId() userId: string,
    @Param('segmentId') segmentId: string,
    @Body() strategyDto: SegmentCreationDTO,
  ) {
    const updatedEligibility = await this.segmentService.updateSegment(
      segmentId,
      strategyDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: updatedEligibility.flagEnvironmentFlagId,
      envId: updatedEligibility.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'edit-segment-name',
      data: JSON.stringify(updatedEligibility),
    });

    return updatedEligibility;
  }

  @Post(':segmentId/rules')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async addRuleToSegment(
    @UserId() userId: string,
    @Param('segmentId') segmentId: string,
  ) {
    const rule = await this.segmentService.createRuleForSegment(segmentId);

    const { flagEnvironment: flagEnv } =
      await this.segmentService.getSegmentFlagEnv(rule.segmentUuid);

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    await this.activityLogService.register({
      userId,
      flagId: flagEnv.flagId,
      envId: flagEnv.environmentId,
      concernedEntity: 'flag',
      type: 'create-segment-rule',
      data: JSON.stringify(rule),
    });

    return rule;
  }
}
