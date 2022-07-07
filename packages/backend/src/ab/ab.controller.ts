import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { AbService } from './ab.service';
import { VariantAlreadyExists } from './errors';
import { VariantCreationSchema, VariantCreationDTO } from './experiment.dto';
import { HasExperimentAccess } from './guards/hasExperimentAccess';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';

@Controller()
export class AbController {
  constructor(private readonly abService: AbService) {}

  @Get('experiments/:experimentId')
  @UseGuards(HasExperimentAccess)
  @UseGuards(JwtAuthGuard)
  getStrategies(@Param('experimentId') experimentId: string): Promise<any> {
    return this.abService.getExperimentById(experimentId);
  }

  @Get('experiments/:experimentId/hits')
  @UseGuards(HasExperimentAccess)
  @UseGuards(JwtAuthGuard)
  async getFlagHits(@Param('experimentId') experimentId: string): Promise<any> {
    const hits = await this.abService.listExperimentHits(experimentId);

    // hits are ordered by date, using a rupture is possible
    let rupture: string;
    let ruptureIndex: number = -1;
    const formattedHits = [];

    hits.forEach((hit) => {
      const stringDate = hit.date.toString();

      if (rupture !== stringDate) {
        rupture = stringDate;
        ruptureIndex++;
        formattedHits[ruptureIndex] = { date: hit.date };
      }

      formattedHits[ruptureIndex][hit.uuid] = hit.count;
    });

    return formattedHits;
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

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Delete('experiments/:experimentId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasExperimentAccess)
  @UseGuards(JwtAuthGuard)
  deleteEnv(@Param('experimentId') experimentId: string) {
    return this.abService.deleteExperiment(experimentId);
  }
}
