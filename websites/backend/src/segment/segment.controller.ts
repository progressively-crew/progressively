import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { SegmentService } from './segment.service';
import { HasProjectAccessGuard } from '../projects/guards/hasProjectAccess';
import { HasSegmentAccessGuard } from './guards/hasSegmentAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { SegmentUpsertDTO, SegmentUpsertDTOSchema } from './types';
import { UserId } from '../users/users.decorator';

@Controller()
export class SegmentController {
  constructor(private segmentService: SegmentService) {}

  @Get('/projects/:id/segments')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategies(@Param('id') projectId: string) {
    return this.segmentService.getSegments(projectId);
  }

  @Delete('/segments/:segmentId')
  @UseGuards(HasSegmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteStrategy(@Param('segmentId') segmentId: string) {
    const strategy = await this.segmentService.deleteSegment(segmentId);

    return strategy;
  }

  @Put('/projects/:id/segments')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SegmentUpsertDTOSchema))
  updateStrategy(
    @UserId() userId: string,
    @Param('id') projectId: string,
    @Body() segmentUpsertDTO: Array<SegmentUpsertDTO>,
  ) {
    return this.segmentService.upsertSegments(
      projectId,
      userId,
      segmentUpsertDTO,
    );
  }
}
