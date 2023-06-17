import { Injectable } from '@nestjs/common';
import { FlagEvaluationLimitTrial } from '@progressively/shared';
import { PrismaService } from '../database/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import { UserStatus } from './status';
import { AuthProviders } from '../auth/types';
import { UserRoles } from './roles';
import { PlanStatus } from '../billing/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async validateBasicEmailPasswordUser(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user || !user.password) {
      return null;
    }

    const isValidPassword = await CryptoService.isHashEqual(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async createUser(user: Omit<User, 'uuid'>): Promise<User> {
    user.password = await CryptoService.hash(user.password);

    return this.prisma.user.create({ data: user });
  }

  async createUserFromProvider(
    uuid: string,
    email: string,
    authProvider: AuthProviders,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        authProviders: true,
      },
    });

    if (existingUser) {
      const hasAlreadyAprovider = existingUser.authProviders.find(
        (p) => p.uuid === uuid,
      );

      if (!hasAlreadyAprovider) {
        await this.prisma.userOfProvider.create({
          data: {
            uuid,
            provider: authProvider,
            userUuid: existingUser.uuid,
          },
        });
      }

      return existingUser;
    }

    return this.prisma.user.create({
      data: {
        fullname: '',
        email,
        password: '',
        activationToken: '',
        status: UserStatus.Active,
        authProviders: {
          create: {
            uuid,
            provider: authProvider,
          },
        },
      },
    });
  }

  changeFullname(userId: string, fullname: string): Promise<User> {
    return this.prisma.user.update({
      data: { fullname },
      where: { uuid: userId },
    });
  }

  async createResetPasswordTokenForUser(uuid: string) {
    const rawToken = uuidv4();
    const hashedToken = CryptoService.sha256(rawToken);

    const dateEnd = new Date();
    dateEnd.setMinutes(dateEnd.getMinutes() + 15);

    await this.prisma.passwordResetTokens.create({
      data: {
        userUuid: uuid,
        token: hashedToken,
        dateEnd,
      },
    });

    return rawToken;
  }

  findByUuid(uuid: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  getPlans(uuid: string, planStatus: PlanStatus) {
    return this.prisma.plan.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        userUuid: uuid,
        status: planStatus,
      },
    });
  }

  async hasUsers() {
    const users = await this.prisma.user.findMany({});

    return users.length > 0;
  }

  checkPasswordToken(rawToken: string) {
    const hashedToken = CryptoService.sha256(rawToken);

    return this.prisma.passwordResetTokens.findFirst({
      where: {
        token: hashedToken,
        dateEnd: {
          gt: new Date(),
        },
      },
    });
  }

  async resetUserPassword(userId: string, rawPassword: string) {
    const newHashedPassword = await CryptoService.hash(rawPassword);

    const queries = [
      this.prisma.passwordResetTokens.deleteMany({
        where: {
          userUuid: userId,
        },
      }),
      this.prisma.user.update({
        data: {
          password: newHashedPassword,
          status: UserStatus.Active,
          activationToken: null,
        },
        where: {
          uuid: userId,
        },
      }),
    ];

    const result = await this.prisma.$transaction(queries);

    return result[result.length - 1];
  }

  async changeUserPassword(password: string, userId: string) {
    const encryptedPassword = await CryptoService.hash(password);

    return this.prisma.user.update({
      data: {
        password: encryptedPassword,
      },
      where: {
        uuid: userId,
      },
    });
  }

  getHitsForMonth(userId: string, d: Date) {
    const start = new Date();
    start.setDate(1);

    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    return this.prisma.flagHit.count({
      where: {
        date: {
          lte: end,
          gte: start,
        },
        flagEnvironment: {
          environment: {
            project: {
              userProject: {
                some: {
                  userId,
                  role: UserRoles.Admin,
                },
              },
            },
          },
        },
      },
    });
  }

  async isPlanValid(clientKey: string) {
    const activePlan = await this.getProjectOwnerFromEnvClientKey(clientKey);

    const flagHits = await this.getHitsForEnv(clientKey);

    // Subscriber
    if (activePlan) {
      return flagHits < activePlan.evaluationCount;
    }

    // trialing
    return flagHits < FlagEvaluationLimitTrial;
  }

  getHitsForEnv(environmentKey: string) {
    const start = new Date();
    start.setDate(1);

    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    return this.prisma.flagHit.count({
      where: {
        date: {
          lte: end,
          gte: start,
        },
        flagEnvironment: {
          environment: {
            clientKey: environmentKey,
          },
        },
      },
    });
  }

  async getProjectOwnerFromEnvClientKey(clientKey: string) {
    const userOwnerOfProject = await this.prisma.user.findFirst({
      where: {
        userProject: {
          some: {
            role: UserRoles.Admin,
            project: {
              environments: {
                some: {
                  clientKey,
                },
              },
            },
          },
        },
      },
    });

    if (!userOwnerOfProject) return undefined;

    const activePlan = await this.prisma.plan.findFirst({
      where: {
        status: PlanStatus.ACTIVE,
        userUuid: userOwnerOfProject.uuid,
      },
    });

    return activePlan;
  }
}
