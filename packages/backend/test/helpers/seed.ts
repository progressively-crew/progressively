import { PrismaClient } from '@prisma/client';
import { UserRoles } from '../../src/users/roles';
import { seedPasswordReset, seedUsers } from './seeds/users';
import { seedProjects } from './seeds/projects';
import { seedFlags, seedFlagHits } from './seeds/flags';
import { seedAbExperiments } from './seeds/ab';

const prismaClient = new PrismaClient();

export const seedDb = async () => {
  await prismaClient.$connect();

  try {
    // Initial seeding
    const [marvin, john, , , withoutFullName] = await seedUsers(prismaClient);
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
    const [homePageFlag, footerFlag, asideFlag] = await seedFlags(prismaClient);

    const flagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: homePageFlag.uuid,
      },
    });

    const footerFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: footerFlag.uuid,
        status: 'ACTIVATED',
      },
    });

    const otherFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: otherEnv.uuid,
        flagId: asideFlag.uuid,
      },
    });

    await prismaClient.rolloutStrategy.create({
      data: {
        uuid: '1',
        flagEnvironmentFlagId: flagEnv.flagId,
        flagEnvironmentEnvironmentId: flagEnv.environmentId,
        name: 'Super strategy',
        strategyRuleType: 'default',
        activationType: 'boolean',
      },
    });

    await prismaClient.rolloutStrategy.create({
      data: {
        uuid: '2',
        flagEnvironmentFlagId: footerFlagEnv.flagId,
        flagEnvironmentEnvironmentId: footerFlagEnv.environmentId,
        name: 'Field based',
        strategyRuleType: 'field',
        activationType: 'boolean',
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
        activationType: 'boolean',
      },
    });

    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 1, 1), 10);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 3, 1), 20);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 2, 1), 40);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 6, 1), 10);
    // End of Flag setup

    // Ab experiments setup
    const [homePageExperiment, footerExperiment] = await seedAbExperiments(
      prismaClient,
    );
    await prismaClient.experimentEnvironment.create({
      data: {
        environmentId: production.uuid,
        experimentId: homePageExperiment.uuid,
      },
    });

    await prismaClient.experimentEnvironment.create({
      data: {
        environmentId: production.uuid,
        experimentId: footerExperiment.uuid,
      },
    });

    // End of Ab experiments setup
  } catch (e) {
    console.error(e);
  }

  await prismaClient.$disconnect();
};

export const cleanupDb = async () => {
  await prismaClient.$connect();
  await prismaClient.rolloutStrategy.deleteMany();
  await prismaClient.refreshToken.deleteMany();
  await prismaClient.flagHit.deleteMany();
  await prismaClient.flagEnvironment.deleteMany();
  await prismaClient.flag.deleteMany();
  await prismaClient.variationHit.deleteMany();
  await prismaClient.variation.deleteMany();
  await prismaClient.experimentEnvironment.deleteMany();
  await prismaClient.experiment.deleteMany();
  await prismaClient.environment.deleteMany();
  await prismaClient.passwordResetTokens.deleteMany();
  await prismaClient.userProject.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.project.deleteMany();
  await prismaClient.$disconnect();
};
