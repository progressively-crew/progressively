import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
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
import { AppLoggerMiddleware } from './logging.middleware';

@Module({
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
        // other transports...
      ],
      // other options
    }),
    ConfigModule.forRoot(),
    TokensModule,
    FlagsModule,
    ProjectsModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: process.env.THROTTLING_TTL ? Number(process.env.THROTTLING_TTL) : 60,
      limit: process.env.THROTTLING_LIMIT
        ? Number(process.env.THROTTLING_LIMIT)
        : 10,
    }),
    WebsocketModule,
    EnvironmentsModule,
    StrategyModule,
  ],
  providers: [AppService, MailService],
  controllers: [EnvironmentsController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
