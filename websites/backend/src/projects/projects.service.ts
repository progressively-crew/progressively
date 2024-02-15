import { Injectable } from '@nestjs/common';
import camelcase from 'camelcase';
import { v4 as uuidv4 } from 'uuid';
import { UserRoles } from '../users/roles';
import { PrismaService } from '../database/prisma.service';
import { FlagAlreadyExists } from './errors';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

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

  createProject(name: string, userId: string, prodDomain: string) {
    return this.prisma.project.create({
      data: {
        name,
        domain: prodDomain,
        userProject: {
          create: {
            userId,
            role: UserRoles.Admin,
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
      this.prisma.webhook.deleteMany({
        where: {
          Flag: {
            projectUuid: projectId,
          },
        },
      }),
      this.prisma.flagHit.deleteMany({
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
      this.prisma.event.deleteMany({
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

  getMetricCount(
    projectId: string,
    startDate: string,
    endDate: string,
    eventFilter?: string,
  ) {
    const eventFilterObj = eventFilter
      ? { name: eventFilter }
      : {
          NOT: {
            name: 'Page View',
          },
        };

    return this.prisma.event.count({
      where: {
        projectUuid: projectId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },

        ...eventFilterObj,
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

  getDistinctEventName(
    projectId: string,
    startDate: string,
    endDate: string,
    eventFilter?: string,
  ) {
    const eventFilterObj = eventFilter ? { name: eventFilter } : {};

    return this.prisma.event.findMany({
      distinct: ['name'],
      where: {
        projectUuid: projectId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        ...eventFilterObj,
      },
    });
  }

  async getEventsPerDate(
    projectId: string,
    startDate: string,
    endDate: string,
    pageView: boolean,
  ) {
    const eventFilter = pageView
      ? { name: 'Page View' }
      : { NOT: { name: 'Page View' } };

    const distinctEventName = await this.getDistinctEventName(
      projectId,
      startDate,
      endDate,
      pageView ? 'Page View' : undefined,
    );

    const dictByDates = {};

    for (const dhv of distinctEventName) {
      const hitsByDate = await this.prisma.event.groupBy({
        _count: true,
        by: ['name', 'date'],
        where: {
          projectUuid: projectId,
          name: dhv.name,
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
          ...eventFilter,
        },
        orderBy: {
          date: 'asc',
        },
      });

      hitsByDate.forEach((hbd) => {
        const isoDate = hbd.date.toISOString();

        if (!dictByDates[isoDate]) {
          dictByDates[isoDate] = {};
        }

        dictByDates[isoDate]['date'] = isoDate;
        dictByDates[isoDate][dhv.name] = hbd._count;
      });
    }

    return Object.keys(dictByDates)
      .sort()
      .map((k) => dictByDates[k]);
  }

  getEventsPerDatePerGroup(
    projectId: string,
    startDate: string,
    endDate: string,
    group: 'os' | 'browser' | 'url' | 'referer',
  ) {
    const notConstrains = group === 'referer' ? { NOT: { referer: null } } : {};

    return this.prisma.event.groupBy({
      by: [group],
      _count: {
        uuid: true,
      },
      where: {
        projectUuid: projectId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        name: 'Page View',
        ...notConstrains,
      },
      orderBy: {
        _count: {
          uuid: 'desc',
        },
      },
    });
  }

  getUniqueVisitor(projectId: string, startDate: string, endDate: string) {
    return this.prisma.event.findMany({
      distinct: ['visitorId'],
      where: {
        projectUuid: projectId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });
  }

  async getBounceRate(projectId: string, startDate: string, endDate: string) {
    const uniquePageViewSession = await this.prisma.$queryRaw`
      SELECT Count("Session"."uuid")
      FROM "Session"
      INNER JOIN "Event" ON "Session"."uuid" = "Event"."sessionUuid"
      WHERE "Session"."projectUuid" = ${projectId}
      AND "Event"."date" BETWEEN ${startDate}::timestamp AND ${endDate}::timestamp
      AND "Event"."name" = 'Page View'
      GROUP BY "Session"."uuid"
      HAVING COUNT("Event"."uuid") = 1
    `;

    const allSessionCount = await this.prisma.session.count({
      where: {
        projectUuid: projectId,
        startedAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
    });

    const singlepagesessions = (uniquePageViewSession[0] as any)?.count as
      | number
      | undefined;

    let bounceRate = 0;
    if (singlepagesessions && allSessionCount) {
      bounceRate = (Number(singlepagesessions) / Number(allSessionCount)) * 100;
    }

    return bounceRate;
  }

  getPageViewEventUrl(projectId: string, startDate: string, endDate: string) {
    return this.prisma.event.findMany({
      distinct: ['url'],
      where: {
        projectUuid: projectId,
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        name: 'Page View',
      },
    });
  }
}
