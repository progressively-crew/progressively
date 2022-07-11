import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { EnvironmentsModule } from '../environments/environments.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [EnvironmentsModule, UsersModule, MailModule, DatabaseModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
