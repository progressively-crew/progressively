import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { FlagsModule } from './flags/flags.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';
import { MailService } from './mail/mail.service';
import { TokensModule } from './tokens/tokens.module';
import { EnvironmentsController } from './environments/environments.controller';
import { EnvironmentsModule } from './environments/environments.module';
import { StrategyModule } from './strategy/strategy.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TokensModule,
    FlagsModule,
    ProjectsModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    WebsocketModule,
    EnvironmentsModule,
    StrategyModule,
  ],
  providers: [AppService, MailService],
  controllers: [EnvironmentsController],
})
export class AppModule {}
