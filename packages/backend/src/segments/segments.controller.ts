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
import { WebsocketGateway } from '../websocket/websocket.gateway';

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
  getSegmentById(@Param('segmentId') segmentId: string) {
    return this.segmentService.getSegment(segmentId);
  }

  @Put(':segmentId')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SegmentSchema))
  async updateSegment(
    @UserId() userId: string,
    @Param('segmentId') segmentId: string,
    @Body() segmentDto: SegmentCreationDTO,
  ) {
    const updatedSegment = await this.segmentService.updateSegment(
      segmentId,
      segmentDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: updatedSegment.flagEnvironmentFlagId,
      envId: updatedSegment.flagEnvironmentEnvironmentId,
      concernedEntity: 'flag',
      type: 'edit-segment-name',
      data: JSON.stringify(updatedSegment),
    });

    return updatedSegment;
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
