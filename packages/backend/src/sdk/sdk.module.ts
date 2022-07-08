import { Module } from '@nestjs/common';
import { FlagsModule } from '../flags/flags.module';
import { EnvironmentsModule } from '../environments/environments.module';
import { SdkController } from './sdk.controller';
import { SdkService } from './sdk.service';
import { AbModule } from '../ab/ab.module';

@Module({
  controllers: [SdkController],
  imports: [EnvironmentsModule, FlagsModule, AbModule],
  providers: [SdkService],
})
export class SdkModule {}
