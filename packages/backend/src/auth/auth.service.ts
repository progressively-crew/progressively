import { Injectable, NotFoundException } from '@nestjs/common';
import { CryptoService } from '../crypto/crypto.service';
import { PrismaService } from '../prisma.service';
import { UserStatus } from '../users/status';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async activateUser(rawToken: string) {
    const hashedToken = CryptoService.sha256(rawToken);
    const user = await this.prisma.user.findFirst({
      where: {
        activationToken: hashedToken,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const updatedUser = await this.prisma.user.update({
      data: {
        status: UserStatus.Active,
        activationToken: null,
      },
      where: {
        uuid: user.uuid,
      },
    });

    return updatedUser;
  }
}
