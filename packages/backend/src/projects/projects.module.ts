import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { FlagsModule } from '../flags/flags.module';
import { StrategyModule } from '../strategy/strategy.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    FlagsModule,
    StrategyModule,
    EnvironmentsModule,
    UsersModule,
    MailModule,
    DatabaseModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
