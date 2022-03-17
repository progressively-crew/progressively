import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CryptoService } from '../crypto/crypto.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<User> {
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

  findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  getAll() {
    return this.prisma.user.findMany({
      select: {
        uuid: true,
        fullname: true,
        email: true,
      },
    });
  }

  async checkPasswordToken(rawToken: string) {
    const hashedToken = CryptoService.sha256(rawToken);

    const passwordToken = await this.prisma.passwordResetTokens.findFirst({
      where: {
        token: hashedToken,
        dateEnd: {
          gt: new Date(),
        },
      },
    });

    return passwordToken;
  }

  async resetUserPassword(userId: string, rawPassword: string) {
    const newHashedPassword = await CryptoService.hash(rawPassword);

    await this.prisma.passwordResetTokens.deleteMany({
      where: {
        userUuid: userId,
      },
    });

    return this.prisma.user.update({
      data: {
        password: newHashedPassword,
      },
      where: {
        uuid: userId,
      },
    });
  }

  async changeUserPassword(password: string, userId: string) {
    const encryptedPassword = await CryptoService.hash(password);

    const updatedUser = await this.prisma.user.update({
      data: {
        password: encryptedPassword,
      },
      where: {
        uuid: userId,
      },
    });

    return updatedUser;
  }
}
