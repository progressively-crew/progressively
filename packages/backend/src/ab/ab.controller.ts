import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { AbService } from './ab.service';
import { HasExperimentAccess } from './guards/hasExperimentAccess';

@Controller()
export class AbController {
  constructor(private readonly abService: AbService) {}

  @Get('experiments/:experimentId')
  @UseGuards(HasExperimentAccess)
  @UseGuards(JwtAuthGuard)
  getStrategies(@Param('experimentId') experimentId: string): Promise<any> {
    return this.abService.getExperimentById(experimentId);
  }
}
