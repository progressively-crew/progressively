import { Inject, Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../users/roles';
import { PrismaService } from '../database/prisma.service';
import { FlagAlreadyExists } from './errors';
import { EventsService } from '../events/events.service';
import { FlagsService } from '../flags/flags.service';
import { EventsPerCredits, InitialCreditCount } from '../payment/constants';
import { ICachingService } from '../caching/types';
import {
  projectByIdKey,
  projectClientKeyToId,
  projectCreditsKey,
  projectSecretKeyToId,
} from '../caching/keys';
import { Project } from '@progressively/database';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private eventService: EventsService,
    private flagService: FlagsService,
    @Inject('CachingService') private readonly cachingService: ICachingService,
  ) {}

  flagsByProject(projectId: string) {
    return this.prisma.flag.findMany({
      where: {
        projectUuid: projectId,
      },
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  rotateSecretKey(uuid: string) {
    return this.prisma.project.updateMany({
      where: {
        uuid,
      },
      data: {
        secretKey: uuidv4(),
      },
    });
  }

  async _resetProjectCaching(project: Project) {
    const projectSecretCachingKey = projectSecretKeyToId(project.secretKey);
    const projectClientCachingKey = projectClientKeyToId(project.clientKey);
    const projectCachingKey = projectByIdKey(project.uuid);

    await Promise.all([
      this.cachingService.set(projectSecretCachingKey, project.uuid),
      this.cachingService.set(projectClientCachingKey, project.uuid),
      this.cachingService.set(projectCachingKey, project),
    ]);
  }

  async updateProject(projectId: string, name: string, prodDomain: string) {
    const updatedProject = await this.prisma.project.update({
      data: {
        name,
        domain: prodDomain,
      },
      where: {
        uuid: projectId,
      },
    });

    await this._resetProjectCaching(updatedProject);

    return updatedProject;
  }

  async createProject(name: string, userId: string, prodDomain: string) {
    const project = await this.prisma.project.create({
      data: {
        name,
        domain: prodDomain,
        credits: InitialCreditCount,
        userProject: {
          create: {
            userId,
            role: UserRoles.Admin,
          },
        },
      },
    });

    await this.prisma.eventUsage.create({
      data: {
        projectUuid: project.uuid,
        eventsCount: EventsPerCredits,
      },
    });

    const creditCachingKey = projectCreditsKey(project.uuid);
    await this.cachingService.set(creditCachingKey, EventsPerCredits);
    await this._resetProjectCaching(project);

    return project;
  }

  getAll(userId: string) {
    return this.prisma.userProject.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
    });
  }

  getById(uuid: string, populateMember: boolean) {
    let userProject: any = false;

    if (populateMember) {
      userProject = {
        include: {
          user: {
            select: {
              fullname: true,
              uuid: true,
              email: true,
            },
          },
        },
      };
    }

    return this.prisma.project.findUnique({
      where: {
        uuid,
      },
      include: {
        userProject,
      },
    });
  }

  async hasPermissionOnProject(
    projectId: string,
    userId: string,
    roles?: Array<string>,
  ) {
    const userProject = await this.prisma.userProject.findUnique({
      where: {
        userId_projectId: {
          projectId,
          userId,
        },
      },
    });

    if (!userProject) {
      return false;
    }

    if (!roles || roles.length === 0) {
      return true;
    }

    return roles.includes(userProject.role);
  }

  userProject(projectId: string, memberId: string) {
    return this.prisma.userProject.findFirst({
      where: {
        userId: memberId,
        projectId,
      },
      include: {
        user: true,
      },
    });
  }

  removeMember(projectId: string, memberId: string) {
    return this.prisma.userProject.delete({
      where: {
        userId_projectId: {
          userId: memberId,
          projectId,
        },
      },
    });
  }

  addMember(projectId: string, userId: string) {
    return this.prisma.userProject.create({
      data: { userId, projectId, role: UserRoles.User },
    });
  }

  async deleteProject(projectId: string) {
    const deleteQueries = [
      this.prisma.eventUsage.deleteMany({
        where: {
          projectUuid: projectId,
        },
      }),
      this.prisma.webhook.deleteMany({
        where: {
          Flag: {
            projectUuid: projectId,
          },
        },
      }),

      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            Flag: {
              projectUuid: projectId,
            },
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            Flag: {
              projectUuid: projectId,
            },
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          Flag: {
            projectUuid: projectId,
          },
        },
      }),
      this.prisma.session.deleteMany({
        where: {
          projectUuid: projectId,
        },
      }),
      this.prisma.variant.deleteMany({
        where: {
          Flag: {
            projectUuid: projectId,
          },
        },
      }),

      this.prisma.flag.deleteMany({ where: { projectUuid: projectId } }),

      this.prisma.userProject.deleteMany({
        where: {
          projectId,
        },
      }),

      this.prisma.project.delete({
        where: {
          uuid: projectId,
        },
      }),
    ];

    const result = await this.prisma.$transaction(deleteQueries);
    await this.eventService.deleteForProject(projectId);
    await this.flagService.deleteFlagHitsOfProject(projectId);

    const projectCachingKey = projectByIdKey(projectId);
    const project = await this.cachingService.get<Project>(projectCachingKey);

    if (project) {
      const projectSecretCachingKey = projectSecretKeyToId(project.secretKey);
      const projectClientCachingKey = projectClientKeyToId(project.clientKey);

      await Promise.all([
        this.cachingService.del(projectCachingKey),
        this.cachingService.del(projectSecretCachingKey),
        this.cachingService.del(projectClientCachingKey),
      ]);
    }

    return result[result.length - 1];
  }

  async createProjectFlag(
    projectId: string,
    name: string,
    description: string,
  ) {
    const flagKey = camelcase(name);

    const existingFlag = await this.prisma.flag.findFirst({
      where: {
        projectUuid: projectId,
        key: flagKey,
      },
    });

    if (existingFlag) {
      throw new FlagAlreadyExists();
    }

    return await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
        projectUuid: projectId,
      },
    });
  }

  getFunnels(projectId: string) {
    return this.prisma.funnel.findMany({
      where: {
        projectUuid: projectId,
      },
    });
  }
}
