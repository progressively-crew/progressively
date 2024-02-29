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
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import {
  AddMemberProjectDTO,
  ProjectCreationDTO,
  ProjectCreationSchema,
  ProjectRetrieveDTO,
} from './projects.dto';
import { ProjectsService } from './projects.service';
import { UserRetrieveDTO } from '../users/users.dto';
import { Roles } from '../shared/decorators/Roles';
import { UserRoles } from '../users/roles';
import { HasProjectAccessGuard } from './guards/hasProjectAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { UsersService } from '../users/users.service';
import { UserStatus } from '../users/status';
import { MailService } from '../mail/mail.service';
import { FlagCreationDTO, FlagCreationSchema } from '../flags/flags.dto';
import { FlagAlreadyExists } from './errors';
import {
  FunnelCreationSchema,
  FunnelCreationDTO,
} from '../funnels/funnels.dto';
import { FunnelsService } from '../funnels/funnels.service';
import { ReservedEventName, Timeframe, Timeframes } from '../events/types';
import { EventsService } from '../events/events.service';

@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectService: ProjectsService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly funnelService: FunnelsService,
    private readonly eventService: EventsService,
  ) {}

  @Get(':id')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  getById(
    @Param('id') id: string,
    @Query('populate') populateMember?: boolean,
  ) {
    return this.projectService.getById(id, populateMember);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProjects(@Request() req) {
    const user: UserRetrieveDTO = req.user;

    return this.projectService.getAll(user.uuid);
  }

  @Get(':id/flags')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlagsByProject(@Param('id') id: string) {
    return this.projectService.flagsByProject(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ProjectCreationSchema))
  createProject(
    @Request() req,
    @Body() projectDto: ProjectCreationDTO,
  ): Promise<ProjectRetrieveDTO> {
    const user: UserRetrieveDTO = req.user;

    return this.projectService.createProject(
      projectDto.name,
      user.uuid,
      projectDto.domain,
    );
  }

  @Post(':id/rotate')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  rotateSecretKey(@Param('id') id: string) {
    return this.projectService.rotateSecretKey(id);
  }

  @Delete(':id/members/:memberId')
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

    return await this.projectService.removeMember(id, memberId);
  }

  @Post(':id/members')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async addMember(
    @Param('id') id: string,
    @Body() memberProjectDto: AddMemberProjectDTO,
  ) {
    const user = await this.userService.findByEmail(memberProjectDto.email);
    let newMember;

    if (!user) {
      newMember = await this.userService.createUser({
        email: memberProjectDto.email,
        fullname: '',
        password: '',
        status: UserStatus.Active,
        activationToken: '',
      });

      const rawToken = await this.userService.createResetPasswordTokenForUser(
        newMember.uuid,
      );

      await this.mailService.inviteUserProject(
        newMember.fullname,
        newMember.email,
        rawToken,
      );
    } else {
      const userProject = await this.projectService.userProject(id, user.uuid);

      if (userProject) {
        throw new ConflictException(
          'The user is already a member of the project.',
        );
      }

      newMember = user;
    }

    return this.projectService.addMember(id, newMember.uuid);
  }

  @Delete(':id')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  @Post(':id/funnels')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FunnelCreationSchema))
  createFunnel(@Param('id') id: string, @Body() body: FunnelCreationDTO) {
    return this.funnelService.createFunnel(id, body.name, body.funnelEntries);
  }

  @Post(':id/flags')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FlagCreationSchema))
  async createFlag(@Param('id') id, @Body() body: FlagCreationDTO) {
    try {
      return await this.projectService.createProjectFlag(
        id,
        body.name,
        body.description,
      );
    } catch (e) {
      if (e instanceof FlagAlreadyExists) {
        throw new BadRequestException('Flag already exists');
      }

      throw e;
    }
  }

  @Get(':id/metrics/global')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getMetricCount(
    @Param('id') id: string,
    @Query('timeframe') timeframe: string,
  ) {
    if (!Timeframes.includes(timeframe)) {
      throw new BadRequestException('timeframe is required.');
    }

    const [pageViews, uniqueVisitors] = await Promise.all([
      this.eventService.getPageViews(id, Number(timeframe) as Timeframe),
      this.eventService.getUniqueVisitors(id, Number(timeframe) as Timeframe),
    ]);

    return { pageViews, uniqueVisitors };
  }

  @Get(':id/funnels')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getFunnels(
    @Param('id') id: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const funnels = await this.projectService.getFunnels(id);
    return await this.funnelService.buildFunnelCharts(
      id,
      funnels,
      startDate,
      endDate,
    );
  }

  @Get(':id/events/fields')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getEventsByDate(
    @Param('id') id: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const [browser, os, referrer, viewport] = await Promise.all([
      this.eventService.getByField(id, 7, 'browser'),
      this.eventService.getByField(id, 7, 'os'),
      this.eventService.getByField(id, 7, 'referer'),
      this.eventService.getByViewport(id, 7),
    ]);

    return {
      browser,
      os,
      referrer,
      viewport,
    };
  }

  @Get(':id/events/distinct')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getDistinctEventName(
    @Param('id') id: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const distinctEvents = await this.projectService.getDistinctEventName(
      id,
      startDate,
      endDate,
    );

    return distinctEvents.map((ev) => ev.name);
  }

  @Get(':id/events/pageview/urls')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getPageViewEventUrl(
    @Param('id') id: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }

    const pageViewEvents = await this.projectService.getPageViewEventUrl(
      id,
      startDate,
      endDate,
    );

    return pageViewEvents.map((e) => e.url);
  }
}
