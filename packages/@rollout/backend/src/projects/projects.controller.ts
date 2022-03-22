import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Get,
  Param,
  Delete,
  Query,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ProjectCreationDTO, ProjectCreationSchema } from './projects.dto';
import { ProjectsService } from './projects.service';
import { UserRetrieveDTO } from 'src/users/users.dto';
import { UserProject } from '@prisma/client';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { HasProjectAccessGuard } from './guards/hasProjectAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
@ApiBearerAuth()
@Controller()
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get('projects/:id')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  getById(
    @Param('id') id: string,
    @Query('populate') populateMember?: boolean,
  ) {
    return this.projectService.getById(id, populateMember);
  }

  @Get('projects')
  @UseGuards(JwtAuthGuard)
  getAllProjects(@Request() req) {
    const user: UserRetrieveDTO = req.user;

    return this.projectService.getAll(user.uuid);
  }

  @Post('projects')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ProjectCreationSchema))
  async createProject(
    @Request() req,
    @Body() projectDto: ProjectCreationDTO,
  ): Promise<UserProject> {
    const user: UserRetrieveDTO = req.user;

    return this.projectService.createProject(projectDto.name, user.uuid);
  }

  @Delete('projects/:id/members/:memberId')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ) {
    const userProject = await this.projectService.userProject(id, memberId);

    if (!userProject) {
      throw new NotFoundException();
    }

    if (userProject.role === UserRoles.Admin) {
      throw new UnauthorizedException();
    }

    return this.projectService.removeMember(id, memberId);
  }

  @Delete('projects/:id')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
