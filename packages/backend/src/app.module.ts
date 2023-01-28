import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppService } from './app.service';
import { FlagsModule } from './flags/flags.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';
import { TokensModule } from './tokens/tokens.module';
import { EnvironmentsModule } from './environments/environments.module';
import { StrategyModule } from './strategy/strategy.module';
import { AppLoggerMiddleware } from './logging.middleware';
import { SdkModule } from './sdk/sdk.module';
import { MailModule } from './mail/mail.module';
import { DatabaseModule } from './database/database.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { EligibilityModule } from './eligibility/eligibility.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import 'winston-daily-rotate-file';

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
        new winston.transports.DailyRotateFile({
          filename: 'logs/progressively-backend-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
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
    SdkModule,
    MailModule,
    DatabaseModule,
    SchedulingModule,
    WebhooksModule,
    EligibilityModule,
    ActivityLogModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
