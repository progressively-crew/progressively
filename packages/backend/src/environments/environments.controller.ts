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
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { EnvironmentsService } from './environments.service';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { HasEnvironmentAccessGuard } from './guards/hasEnvAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { FlagsService } from '../flags/flags.service';
import { FlagAlreadyExists } from '../flags/errors';
import { FlagCreationSchema } from '../flags/flags.dto';
@ApiBearerAuth()
@Controller()
export class EnvironmentsController {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly flagService: FlagsService,
  ) {}

  /**
   * Get all the flag of a given project/env (by projectId and envId)
   */
  @Get('projects/:id/environments/:envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlagsByProjectAndEnv(@Param('envId') envId: string) {
    return this.flagService.flagsByEnv(envId);
  }

  /**
   * Create a flag on a given project/env (by projectId and envId)
   */
  @Post('projects/:id/environments/:envId/flags')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FlagCreationSchema))
  async createFlag(
    @Param('envId') envId,
    @Body() body: { name: string; description: string },
  ) {
    try {
      const flag = await this.flagService.createFlag(
        envId,
        body.name,
        body.description,
      );

      return flag;
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
  @Delete('projects/:id/environments/:envId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteEnv(@Param('envId') envId: string) {
    return this.envService.deleteEnv(envId);
  }
}
