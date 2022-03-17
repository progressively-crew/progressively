import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../jwtConstants';
import { PrismaService } from '../prisma.service';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants().AccessTokenSecret,
      // signOptions: { expiresIn: 60 * 15 + 's' }, // 15mns
      signOptions: { expiresIn: 60 * 60 * 24 + 's' }, // 1d
    }),
  ],
  providers: [TokensService, PrismaService],
  exports: [TokensService],
})
export class TokensModule {}
