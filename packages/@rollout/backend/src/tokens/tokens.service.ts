import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { jwtConstants } from '../jwtConstants';
import { RefreshTokenPayload } from './types';
import { UserRetrieveDTO } from '../users/users.dto';

@Injectable()
export class TokensService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  createAccessToken(payload: any, subject: string) {
    return this.jwtService.signAsync(payload, { subject });
  }

  async createRefreshToken(payload: any) {
    const { RefreshTokenExpire, RefreshTokenSecret } = jwtConstants();
    const expiration = new Date();

    expiration.setTime(expiration.getTime() + RefreshTokenExpire);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: RefreshTokenSecret,
      expiresIn: `${RefreshTokenExpire}s`,
    });

    return refreshToken;
  }

  async refreshTokens(encodedRefreshToken: string) {
    const payload: any = await this.decodeRefreshToken(encodedRefreshToken);

    const user = await this.prismaService.user.findFirst({
      where: {
        uuid: payload.userId,
      },
    });

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    const userDTO: UserRetrieveDTO = {
      uuid: user.uuid,
      email: user.email,
      fullname: user.fullname,
    };

    const nextAccessToken = await this.createAccessToken(userDTO, user.uuid);
    const nextRefreshToken = await this.createRefreshToken({
      userId: user.uuid,
    });

    return { accessToken: nextAccessToken, nextRefreshToken: nextRefreshToken };
  }

  async decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    return this.jwtService.verifyAsync(token);
  }
}
