import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv } from 'src/flags/types';
import { FieldRecord } from '../strategy/types';

@Injectable()
export class SdkService {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly flagService: FlagsService,
  ) {}

  resolveUserId(params: FieldRecord, cookieUserId?: string) {
    if (cookieUserId) {
      // User exists, subsequent requests
      return cookieUserId;
    }

    if (params?.id) {
      // User exists, but initial request
      return String(params.id);
    }

    // first visit but anonymous
    return nanoid();
  }

  parseBase64Params(b64: string): FieldRecord {
    try {
      return JSON.parse(Buffer.from(b64, 'base64').toString('ascii'));
    } catch (e) {
      throw new BadRequestException();
    }
  }

  async resolveSdkFlags(fields: FieldRecord) {
    const clientKey = String(fields.clientKey);
    const flagEnvs = (await this.envService.getFlagEnvironmentByClientKey(
      clientKey,
    )) as unknown as Array<PopulatedFlagEnv>;

    const flags = {};

    for (const flagEnv of flagEnvs) {
      let nextFlag: PopulatedFlagEnv = flagEnv;

      if (flagEnv.scheduling.length > 0) {
        nextFlag = await this.flagService.manageScheduling(
          flagEnv as unknown as PopulatedFlagEnv,
        );
      }

      const flagStatusOrVariant = this.flagService.resolveFlagStatus(
        nextFlag as unknown as PopulatedFlagEnv,
        fields,
      );

      flags[nextFlag.flag.key] = flagStatusOrVariant;

      await this.flagService.hitFlag(
        nextFlag.environmentId,
        nextFlag.flagId,
        String(flagStatusOrVariant),
      );
    }

    return flags;
  }
}
