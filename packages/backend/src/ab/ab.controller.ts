import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { AbService } from './ab.service';
import { ExperimentAlreadyExists, VariantAlreadyExists } from './errors';
import { VariantCreationSchema, VariantCreationDTO } from './experiment.dto';
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

  @Post('experiments/:experimentId/variants')
  @UseGuards(HasExperimentAccess)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantCreationSchema))
  async createVariation(
    @Param('experimentId') experimentId,
    @Body() body: VariantCreationDTO,
  ) {
    try {
      const variant = await this.abService.createVariant(
        experimentId,
        body.name,
        body.description,
      );

      return variant;
    } catch (e) {
      if (e instanceof VariantAlreadyExists) {
        throw new BadRequestException('Variant already exists');
      }

      throw e;
    }
  }
}
