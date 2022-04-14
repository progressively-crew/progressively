import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from '../mail/mail.service';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [TokensModule],
  providers: [UsersService, PrismaService, MailService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
