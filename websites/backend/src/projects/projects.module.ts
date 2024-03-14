import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../database/database.module';
import { FunnelsModule } from '../funnels/funnels.module';
import { EventsModule } from '../events/events.module';
import { FlagsModule } from '../flags/flags.module';

@Module({
  imports: [
    UsersModule,
    MailModule,
    DatabaseModule,
    FunnelsModule,
    EventsModule,
    FlagsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
