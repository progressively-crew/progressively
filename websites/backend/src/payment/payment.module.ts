import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { DatabaseModule } from '../database/database.module';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [DatabaseModule, ProjectsModule],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
