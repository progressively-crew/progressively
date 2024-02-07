import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { UserRoles } from '../users/roles';
import { PrismaService } from '../database/prisma.service';
import { FlagAlreadyExists } from './errors';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  flagsByProject(projectId: string) {
    return this.prisma.flag.findMany({
      include: {
        flagEnvironment: true,
      },
      where: {
        flagEnvironment: {
          some: {
            environment: {
              projectId,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createProject(name: string, userId: string, prodDomain: string) {
    return this.prisma.project.create({
      data: {
        name,
        userProject: {
          create: {
            userId,
            role: UserRoles.Admin,
          },
        },
        environments: {
          createMany: {
            data: [
              { name: 'Development', domain: '**' },
              { name: 'Production', domain: prodDomain },
            ],
          },
        },
      },
    });
  }

  getAll(userId: string) {
    return this.prisma.userProject.findMany({
      where: {
        userId,
      },
      include: {
        project: {
          include: {
            environments: {
              include: {
                flagEnvironment: {
                  include: {
                    flag: true,
                  },
                },
              },
            },
          },
        },
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
        environments: {
          orderBy: {
            createdAt: 'asc',
          },
        },
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
    const flagEnvs = await this.prisma.flagEnvironment.findMany({
      where: {
        environment: {
          projectId,
        },
      },
    });

    const getDeleteFlagsQueries = () =>
      flagEnvs.map((flagEnv) =>
        this.prisma.flag.deleteMany({ where: { uuid: flagEnv.flagId } }),
      );

    const deleteQueries = [
      this.prisma.webhook.deleteMany({
        where: {
          flagEnvironment: {
            environment: {
              projectId,
            },
          },
        },
      }),
      this.prisma.flagHit.deleteMany({
        where: {
          FlagEnvironment: {
            environment: {
              projectId,
            },
          },
        },
      }),
      this.prisma.rule.deleteMany({
        where: {
          Strategy: {
            FlagEnvironment: {
              environment: {
                projectId,
              },
            },
          },
        },
      }),
      this.prisma.strategyVariant.deleteMany({
        where: {
          strategy: {
            FlagEnvironment: {
              environment: {
                projectId,
              },
            },
          },
        },
      }),
      this.prisma.strategy.deleteMany({
        where: {
          FlagEnvironment: {
            environment: {
              projectId,
            },
          },
        },
      }),
      this.prisma.event.deleteMany({
        where: {
          Environment: {
            projectId,
          },
        },
      }),
      this.prisma.variant.deleteMany({
        where: {
          flagEnvironment: {
            environment: {
              projectId,
            },
          },
        },
      }),
      this.prisma.flagEnvironment.deleteMany({
        where: {
          environment: {
            projectId,
          },
        },
      }),
      ...getDeleteFlagsQueries(),
      this.prisma.environment.deleteMany({
        where: {
          projectId,
        },
      }),
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
    return result[result.length - 1];
  }

  async createProjectFlag(
    projectId: string,
    name: string,
    description: string,
  ) {
    const flagKey = camelcase(name);

    const existingFlagEnv = await this.prisma.flagEnvironment.findFirst({
      where: {
        environment: {
          projectId,
        },
        flag: {
          key: flagKey,
        },
      },
    });

    if (existingFlagEnv) {
      throw new FlagAlreadyExists();
    }

    const envsOfProject = await this.prisma.environment.findMany({
      where: {
        projectId,
      },
    });

    return await this.prisma.flag.create({
      data: {
        name,
        description,
        key: flagKey,
        flagEnvironment: {
          createMany: {
            data: envsOfProject.map((env) => ({
              environmentId: env.uuid,
            })),
          },
        },
      },
    });
  }
}
