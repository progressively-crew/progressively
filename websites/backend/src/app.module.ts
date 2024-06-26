import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { FlagsModule } from './flags/flags.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebsocketModule } from './websocket/websocket.module';
import { TokensModule } from './tokens/tokens.module';
import { AppLoggerMiddleware } from './logging.middleware';
import { SdkModule } from './sdk/sdk.module';
import { MailModule } from './mail/mail.module';
import { DatabaseModule } from './database/database.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { ActivityLogModule } from './activity-log/activity-log.module';
import { RuleModule } from './rule/rule.module';
import { StrategyModule } from './strategy/strategy.module';
import { QueuingModule } from './queuing/queuing.module';
import { FunnelsModule } from './funnels/funnels.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { EventsModule } from './events/events.module';
import { PaymentModule } from './payment/payment.module';
import { CachingModule } from './caching/caching.module';
import { SegmentModule } from './segment/segment.module';
import 'winston-daily-rotate-file';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    ScheduleModule.forRoot(),
    TokensModule,
    FlagsModule,
    ProjectsModule,
    UsersModule,
    AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: process.env.THROTTLING_TTL
          ? Number(process.env.THROTTLING_TTL)
          : 60,
        limit: process.env.THROTTLING_LIMIT
          ? Number(process.env.THROTTLING_LIMIT)
          : 10,
      },
    ]),
    WebsocketModule,
    SdkModule,
    MailModule,
    DatabaseModule,
    WebhooksModule,
    ActivityLogModule,
    RuleModule,
    StrategyModule,
    QueuingModule,
    FunnelsModule,
    PubsubModule,
    EventsModule,
    PaymentModule,
    CachingModule,
    SegmentModule,
  ],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
