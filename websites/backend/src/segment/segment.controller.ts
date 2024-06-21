import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { SegmentService } from './segment.service';
import { HasProjectAccessGuard } from '../projects/guards/hasProjectAccess';
import { HasSegmentAccessGuard } from './guards/hasSegmentAccess';

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
}
