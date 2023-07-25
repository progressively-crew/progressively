import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import { jwtConstants } from '../jwtConstants';
import { RefreshTokenPayload } from './types';
import { UserRetrieveDTO } from '../users/users.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class TokensService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  createToken(payload: any, secret: string, expiresIn: number) {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: `${expiresIn}s`,
      jwtid: nanoid(),
    });
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

    const {
      AccessTokenExpire,
      AccessTokenSecret,
      RefreshTokenExpire,
      RefreshTokenSecret,
    } = jwtConstants();

    const nextAccessToken = await this.createToken(
      userDTO,
      AccessTokenSecret,
      AccessTokenExpire,
    );

    const nextRefreshToken = await this.createToken(
      userDTO,
      RefreshTokenSecret,
      RefreshTokenExpire,
    );

    return { accessToken: nextAccessToken, nextRefreshToken: nextRefreshToken };
  }

  decodeRefreshToken(token: string): Promise<RefreshTokenPayload> {
    const { RefreshTokenSecret } = jwtConstants();

    return this.jwtService.verifyAsync(token, {
      secret: RefreshTokenSecret,
    });
  }
}
