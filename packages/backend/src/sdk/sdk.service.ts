import { BadRequestException, Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagsService } from '../flags/flags.service';
import { FlagStatus } from '../flags/flags.status';
import { PopulatedFlagEnv } from 'src/flags/types';
import { FieldRecord } from '../strategy/types';
import { AbService } from '../ab/ab.service';
import { PopulatedExperimentEnv } from '../ab/types';

@Injectable()
export class SdkService {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly flagService: FlagsService,
    private readonly abService: AbService,
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

  async resolveSdkExperiment(fields: FieldRecord) {
    const clientKey = String(fields.clientKey);
    const experimentEnvs =
      await this.envService.getExperimentEnvironmentByClientKey(clientKey);

    const experiments = {};

    for (const experimentEnv of experimentEnvs) {
      const experimentVariant = this.abService.resolveExperimentVariantValue(
        experimentEnv as PopulatedExperimentEnv,
        fields,
      );

      experiments[experimentEnv.experiment.key] = experimentVariant?.key;

      if (experimentVariant) {
        this.abService.hitVariant(experimentVariant.uuid);
      }
      
    }

    return experiments;
  }

  async resolveSdkFlags(fields: FieldRecord) {
    const clientKey = String(fields.clientKey);
    const flagEnvs = await this.envService.getFlagEnvironmentByClientKey(
      clientKey,
    );

    const flags = {};

    for (const flagEnv of flagEnvs) {
      const flagStatus = this.flagService.resolveFlagStatus(
        flagEnv as PopulatedFlagEnv,
        fields,
      );

      flags[flagEnv.flag.key] = flagStatus;

      this.flagService.hitFlag(
        flagEnv.environmentId,
        flagEnv.flagId,
        flagEnv.status as FlagStatus,
      );
    }

    return flags;
  }
}
