import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../prisma.service';
import { TokensModule } from '../tokens/tokens.module';
import { AuthService } from './auth.service';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [UsersModule, PassportModule, TokensModule],
  providers: [
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    AuthService,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
