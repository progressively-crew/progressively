import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from './types';
import { UserStatus } from './status';
import { AuthProviders } from '../auth/types';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async validateBasicEmailPasswordUser(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.findByEmail(email);

    if (!user) {
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
    authProvider: AuthProviders,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        uuid,
      },
    });

    if (existingUser) {
      return null;
    }

    return this.prisma.user.create({
      data: {
        fullname: '',
        email: '',
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
}
