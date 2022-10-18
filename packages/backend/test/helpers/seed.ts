import { PrismaClient } from '@prisma/client';
import { UserRoles } from '../../src/users/roles';
import {
  seedFlagHits,
  seedFlagHitsVariants,
  seedFlagMetricHits,
  seedFlags,
} from './seeds/flags';
import { seedProjects } from './seeds/projects';
import { seedPasswordReset, seedUsers } from './seeds/users';

const prismaClient = new PrismaClient();

export const seedDb = async () => {
  await prismaClient.$connect();

  try {
    // Initial seeding
    const [marvin, john] = await seedUsers(prismaClient);
    const [projectFromSeeding, otherFromSeeding] = await seedProjects(
      prismaClient,
    );

    await seedPasswordReset(prismaClient, john); // Necessary to e2e test password reset

    //  Contextual seeding
    const production = await prismaClient.environment.create({
      data: {
        uuid: '1',
        name: 'Production',
        projectId: projectFromSeeding.uuid,
        clientKey: 'valid-sdk-key',
      },
    });

    await prismaClient.environment.create({
      data: {
        uuid: '2',
        name: 'Developer',
        projectId: projectFromSeeding.uuid,
        clientKey: 'valid-sdk-key-2',
      },
    });

    const otherEnv = await prismaClient.environment.create({
      data: {
        uuid: '3',
        name: 'Staging',
        projectId: otherFromSeeding.uuid,
        clientKey: 'valid-sdk-key-3',
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: projectFromSeeding.uuid,
        userId: marvin.uuid,
        role: UserRoles.Admin,
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: projectFromSeeding.uuid,
        userId: john.uuid,
        role: UserRoles.User,
      },
    });

    // Flag setup
    const [homePageFlag, footerFlag, asideFlag, multiVariate] = await seedFlags(
      prismaClient,
    );

    const flagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: homePageFlag.uuid,
        rolloutPercentage: 100,
      },
    });

    const d = new Date(); // add 10 seconds so that the test don't break because of scheduling updates
    d.setSeconds(d.getSeconds() + 10);
    await prismaClient.schedule.create({
      data: {
        uuid: '1',
        utc: d,
        rolloutPercentage: 100,
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        status: 'ACTIVATED',
      },
    });

    const footerFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: footerFlag.uuid,
        status: 'ACTIVATED',
        rolloutPercentage: 0,
      },
    });

    const otherFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: otherEnv.uuid,
        flagId: asideFlag.uuid,
        rolloutPercentage: 100,
      },
    });

    // Multi variate setup

    const multiVariateFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: multiVariate.uuid,
        rolloutPercentage: 100,
      },
    });

    const aMetric = await prismaClient.pMetric.create({
      data: {
        uuid: '1',
        name: 'A metric',
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });

    const bMetric = await prismaClient.pMetric.create({
      data: {
        uuid: '100',
        name: 'B metric',
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });

    await prismaClient.variant.create({
      data: {
        uuid: '1',
        rolloutPercentage: 12,
        isControl: true,
        value: 'Control',
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });

    await prismaClient.variant.create({
      data: {
        uuid: '2',
        rolloutPercentage: 88,
        isControl: false,
        value: 'Second',
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });
    // End of multi variate setup

    await prismaClient.rolloutStrategy.create({
      data: {
        uuid: '1',
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        name: 'Super strategy',
        strategyRuleType: 'default',
      },
    });

    await prismaClient.rolloutStrategy.create({
      data: {
        uuid: '2',
        flagEnvironmentFlagId: footerFlagEnv.flagId,
        flagEnvironmentEnvironmentId: footerFlagEnv.environmentId,
        name: 'Field based',
        strategyRuleType: 'field',
        fieldName: 'id',
        fieldComparator: 'eq',
        fieldValue: '1',
      },
    });

    await prismaClient.rolloutStrategy.create({
      data: {
        uuid: '3',
        flagEnvironmentFlagId: otherFlagEnv.flagId,
        flagEnvironmentEnvironmentId: otherFlagEnv.environmentId,
        name: 'Super strategy',
        strategyRuleType: 'default',
      },
    });

    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 1, 1), 10);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 3, 1), 20);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 2, 1), 40);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 6, 1), 10);

    await seedFlagMetricHits(
      prismaClient,
      multiVariateFlagEnv,
      aMetric,
      new Date(1992, 0, 1, 1),
      10,
    );

    await seedFlagMetricHits(
      prismaClient,
      multiVariateFlagEnv,
      aMetric,
      new Date(1992, 0, 3, 1),
      20,
    );
    await seedFlagMetricHits(
      prismaClient,
      multiVariateFlagEnv,
      bMetric,
      new Date(1992, 0, 2, 1),
      40,
    );
    await seedFlagMetricHits(
      prismaClient,
      multiVariateFlagEnv,
      aMetric,
      new Date(1992, 0, 2, 1),
      17,
    );
    await seedFlagMetricHits(
      prismaClient,
      multiVariateFlagEnv,
      bMetric,
      new Date(1992, 0, 6, 1),
      10,
    );

    await seedFlagHitsVariants(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 1, 1),
      10,
    );
    await seedFlagHitsVariants(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 4, 1),
      50,
    );
    await seedFlagHitsVariants(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 7, 1),
      20,
    );
    await seedFlagHitsVariants(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 2, 1),
      100,
    );
    await seedFlagHitsVariants(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 22, 1),
      13,
    );

    // End of Flag setup
  } catch (e) {
    console.error(e);
  }

  await prismaClient.$disconnect();
};

export const cleanupDb = async () => {
  await prismaClient.$connect();
  await prismaClient.rolloutStrategy.deleteMany();
  await prismaClient.schedule.deleteMany();
  await prismaClient.refreshToken.deleteMany();
  await prismaClient.flagHit.deleteMany();
  await prismaClient.variant.deleteMany();
  await prismaClient.pMetricHit.deleteMany();
  await prismaClient.pMetric.deleteMany();
  await prismaClient.flagEnvironment.deleteMany();
  await prismaClient.flag.deleteMany();
  await prismaClient.environment.deleteMany();
  await prismaClient.passwordResetTokens.deleteMany();
  await prismaClient.userProject.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.project.deleteMany();
  await prismaClient.$disconnect();
};
