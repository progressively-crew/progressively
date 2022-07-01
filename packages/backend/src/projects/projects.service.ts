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

  addMember(projectId: string, userId: string) {
    return this.prisma.userProject.create({
      data: { userId, projectId, role: UserRoles.User },
    });
  }

  async deleteProject(projectId: string) {
    return this.prisma.project.delete({
      where: {
        uuid: projectId,
      },
    });
  }
}
