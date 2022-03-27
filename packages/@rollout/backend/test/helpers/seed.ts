import { PrismaClient } from '@prisma/client';
import { UserRoles } from '../../src/users/roles';
import { seedPasswordReset, seedUsers } from './seeds/users';
import { seedProjects } from './seeds/projects';
import { seedFlags, seedHits } from './seeds/flags';

const prismaClient = new PrismaClient();

export const seedDb = async () => {
  await prismaClient.$connect();

  try {
    // Initial seeding
    const [marvin, john, jane, gina] = await seedUsers(prismaClient);
    const [projectFromSeeding] = await seedProjects(prismaClient);
    const [homePageFlag] = await seedFlags(prismaClient);
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

    const developer = await prismaClient.environment.create({
      data: {
        uuid: '2',
        name: 'Developer',
        projectId: projectFromSeeding.uuid,
        clientKey: 'valid-sdk-key-2',
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

    const flagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: homePageFlag.uuid,
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

    await seedHits(prismaClient, flagEnv, new Date(1992, 0, 1, 1), 10);
    await seedHits(prismaClient, flagEnv, new Date(1992, 0, 3, 1), 20);
    await seedHits(prismaClient, flagEnv, new Date(1992, 0, 2, 1), 40);
    await seedHits(prismaClient, flagEnv, new Date(1992, 0, 6, 1), 10);
  } catch (e) {
    console.error(e);
  }

  await prismaClient.$disconnect();
};

export const cleanupDb = async () => {
  await prismaClient.$connect();
  await prismaClient.rolloutStrategy.deleteMany({});
  await prismaClient.refreshToken.deleteMany({});
  await prismaClient.flagHit.deleteMany({});
  await prismaClient.flagEnvironment.deleteMany({});
  await prismaClient.flag.deleteMany({});
  await prismaClient.environment.deleteMany({});
  await prismaClient.passwordResetTokens.deleteMany({});
  await prismaClient.userProject.deleteMany({});
  await prismaClient.user.deleteMany({});
  await prismaClient.project.deleteMany({});
  await prismaClient.$disconnect();
};
