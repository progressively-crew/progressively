import {
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
import { Environment } from '@prisma/client';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasProjectAccessGuard } from '../projects/guards/hasProjectAccess';
import { EnvironmentCreationSchema, EnvironmentDTO } from './environments.dto';
import { EnvironmentsService } from './environments.service';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
@ApiBearerAuth()
@Controller()
export class EnvironmentsController {
  constructor(private readonly envService: EnvironmentsService) {}

  /**
   * Get all the environments of a given project (by id)
   */
  @Get('projects/:id/environments')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  getProjectEnvironments(@Param('id') id: string) {
    return this.envService.getProjectEnvironments(id);
  }

  /**
   * Create an environment on a given project (by id)
   */
  @Post('projects/:id/environments')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(EnvironmentCreationSchema))
  createEnvironment(
    @Param('id') id: string,
    @Body() envDto: EnvironmentDTO,
  ): Promise<Environment> {
    return this.envService.createEnvironment(id, envDto.name);
  }

  /**
   * Delete an environment on a given project (by project id AND env id)
   */
  @Delete('projects/:id/environments/:envId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteEnv(@Param('envId') envId: string) {
    return this.envService.deleteEnv(envId);
  }
}
