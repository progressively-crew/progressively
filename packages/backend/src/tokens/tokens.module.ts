import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../database/database.module';
import { getEnvVars } from '../envVariable';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: getEnvVars().AccessTokenSecret,
      // signOptions: { expiresIn: 60 * 15 + 's' }, // 15mns
      signOptions: { expiresIn: 60 * 60 * 24 + 's' }, // 1d
    }),
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
