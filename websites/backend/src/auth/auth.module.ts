import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokensModule } from '../tokens/tokens.module';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../database/database.module';
import { OktaStrategy } from './strategies/okta.strategy';
import { OktaService } from './okta.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TokensModule,
    MailModule,
    DatabaseModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    OktaStrategy,
    AuthService,
    OktaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
