import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import {
  FlagCreationDTO,
  FlagCreationSchema,
  VariantCreationDTO,
} from '../flags/flags.dto';
import { Roles } from '../shared/decorators/Roles';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { UserRoles } from '../users/roles';
import { User } from '../users/types';
import { EnvironmentsService } from './environments.service';
import { FlagAlreadyExists } from './errors';
import { HasEnvironmentAccessGuard } from './guards/hasEnvAccess';

@ApiBearerAuth()
@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly envService: EnvironmentsService) {}

  /**
   * Get all the flag of a given project/env (by projectId and envId)
   */
  @Get(':envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlagsByProjectAndEnv(@Param('envId') envId: string) {
    return this.envService.flagsByEnv(envId);
  }

  /**
   * Create a flag on a given project/env (by projectId and envId)
   */
  @Post(':envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FlagCreationSchema))
  async createFlag(
    @Request() req,
    @Param('envId') envId,
    @Body() body: FlagCreationDTO,
  ) {
    const environments = body.environments;
    const user = req.user as User;

    if (body.variants?.length > 0) {
      const variants: Array<VariantCreationDTO> = body.variants || [];
      const hasControlVariant = variants.some((variant) => variant.isControl);

      if (!hasControlVariant) {
        throw new BadRequestException(
          'At least one variant should be the control variant',
        );
      }
    }

    for (const env of environments) {
      const hasAccessToEnv = await this.envService.hasPermissionOnEnv(
        env,
        user.uuid,
      );

      if (!hasAccessToEnv) {
        throw new Error(
          "You're not authorized to create a flag on this environment.",
        );
      }
    }

    try {
      return await this.envService.createFlagEnvironment(
        envId,
        body.name,
        body.description,
        body.environments,
        body.variants || [],
      );
    } catch (e) {
      if (e instanceof FlagAlreadyExists) {
        throw new BadRequestException('Flag already exists');
      }

      throw e;
    }
  }

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Delete(':envId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteEnv(@Param('envId') envId: string) {
    return this.envService.deleteEnv(envId);
  }
}
