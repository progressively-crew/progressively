import {
  Body,
  Controller,
  Param,
  Get,
  Put,
  Delete,
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
import { HasFlagEnvAccessGuard } from '../../src/flags/guards/hasFlagEnvAccess';

@Controller()
export class SegmentsController {
  constructor(
    private readonly segmentService: SegmentsService,
    private readonly activityLogService: ActivityLogService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  @Get('/segments/:segmentId')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getSegmentById(@Param('segmentId') segmentId: string) {
    return this.segmentService.getSegment(segmentId);
  }

  @Put('/segments/:segmentId')
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

  @Post('/segments/:segmentId/rules')
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

  @Delete('/environments/:envId/flags/:flagId/segments/:segmentId')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteSegment(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Param('segmentId') segmentId: string,
  ) {
    const segmentDeleted = await this.segmentService.deleteSegment(segmentId);

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'delete-segment',
      data: JSON.stringify(segmentDeleted),
    });

    return segmentDeleted;
  }

  @Post('/environments/:envId/flags/:flagId/segments')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SegmentSchema))
  async addSegmentToFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() segmentDto: SegmentCreationDTO,
  ) {
    const segment = await this.segmentService.addSegmentToFlagEnv(
      envId,
      flagId,
      segmentDto.name,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      data: JSON.stringify(segment),
      concernedEntity: 'flag',
      type: 'create-segment',
    });

    return segment;
  }

  @Get('environments/:envId/flags/:flagId/segments')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getSegments(@Param('envId') envId: string, @Param('flagId') flagId: string) {
    return this.segmentService.listSegments(envId, flagId);
  }
}
