import { PrismaClient } from '@prisma/client';
import { FlagStatus } from '../../../src/flags/flags.status';

export const seedFlags = async (prismaClient: PrismaClient) => {
  const homePageFlag = await prismaClient.flag.create({
    data: {
      uuid: '1',
      name: 'New homepage',
      description: 'Switch the new homepage design',
      key: 'newHomepage',
    },
  });

  return [homePageFlag] as const;
};

export const seedHits = async (
  prismaClient: PrismaClient,
  flagEnv,
  date,
  count = 10,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.flagHit.create({
      data: {
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        status: FlagStatus.ACTIVATED,
        date,
      },
    });
  }
};
