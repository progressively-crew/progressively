import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { FlagsModule } from '../flags/flags.module';
import { StrategyModule } from '../strategy/strategy.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    FlagsModule,
    StrategyModule,
    EnvironmentsModule,
    UsersModule,
    MailModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
