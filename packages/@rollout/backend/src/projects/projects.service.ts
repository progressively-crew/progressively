import { Injectable } from '@nestjs/common';
import { UserRoles } from '../users/roles';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(name: string, userId: string) {
    const newProject = await this.prisma.project.create({
      data: {
        name,
      },
    });

    const userProject = await this.prisma.userProject.create({
      data: {
        projectId: newProject.uuid,
        userId,
        role: UserRoles.Admin,
      },
      include: { project: true },
    });

    await this.prisma.environment.create({
      data: {
        name: 'Production',
        projectId: newProject.uuid,
      },
    });

    await this.prisma.environment.create({
      data: {
        name: 'Development',
        projectId: newProject.uuid,
      },
    });

    return userProject;
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
        environments: true,
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

  async deleteProject(projectId: string) {
    // Deep resolve the project
    const fullyResolvedProject = await this.prisma.project.findFirst({
      where: {
        uuid: projectId,
      },
      include: {
        environments: {
          include: {
            flagEnvironment: true,
          },
        },
      },
    });

    for (const env of fullyResolvedProject.environments) {
      for (const flagEnv of env.flagEnvironment) {
        // Remove all flag hits
        await this.prisma.flagHit.deleteMany({
          where: {
            flagEnvironmentFlagId: flagEnv.flagId,
            flagEnvironmentEnvironmentId: flagEnv.environmentId,
          },
        });

        await this.prisma.rolloutStrategy.deleteMany({
          where: {
            flagEnvironmentFlagId: flagEnv.flagId,
            flagEnvironmentEnvironmentId: flagEnv.environmentId,
          },
        });
      }

      // remove all the flagEnv from the given project
      await this.prisma.flagEnvironment.deleteMany({
        where: {
          environmentId: env.uuid,
        },
      });

      // Remove all the flag of the given env
      await this.prisma.flag.deleteMany({
        where: {
          flagEnvironment: {
            every: {
              environmentId: env.uuid,
            },
          },
        },
      });
    }

    // remove all the env from the given project
    await this.prisma.environment.deleteMany({
      where: {
        projectId,
      },
    });

    // remove all the user projects from the given project
    await this.prisma.userProject.deleteMany({
      where: {
        projectId,
      },
    });

    // remove the project itself
    return this.prisma.project.delete({
      where: {
        uuid: projectId,
      },
    });
  }
}
