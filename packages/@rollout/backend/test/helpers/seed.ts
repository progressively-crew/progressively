import { UserRoles } from '../../src/users/roles';
import { UserStatus } from '../../src/users/status';
import { CryptoService } from '../../src/crypto/crypto.service';
import { PrismaClient } from '@prisma/client';
import { FlagStatus } from '../../src/flags/flags.status';

const prismaClient = new PrismaClient();

const seedHits = async (flagEnv, date, count = 10) => {
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

export const seedDb = async () => {
  await prismaClient.$connect();

  try {
    const marvin = await prismaClient.user.create({
      data: {
        uuid: '1',
        fullname: 'Marvin Frachet',
        email: 'marvin.frachet@gmail.com',
        password: await CryptoService.hash('password'),
        activationToken: '1',
        status: UserStatus.Active,
      },
    });

    await prismaClient.user.create({
      data: {
        fullname: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        password: await CryptoService.hash('password'),
        activationToken: '2',
        status: UserStatus.Active,
      },
    });

    const john = await prismaClient.user.create({
      data: {
        uuid: '2',
        fullname: 'John Doe',
        email: 'john.doe@gmail.com',
        password: await CryptoService.hash('password'),
        activationToken: '3',
        status: UserStatus.Active,
      },
    });

    const dateEnd = new Date();
    // In case tests take time...
    dateEnd.setMinutes(dateEnd.getMinutes() + 1000);
    await prismaClient.passwordResetTokens.create({
      data: {
        dateEnd,
        token: CryptoService.sha256('1'),
        userUuid: john.uuid,
      },
    });

    await prismaClient.user.create({
      data: {
        uuid: '4',
        fullname: 'Gina Doe',
        email: 'gina.doe@gmail.com',
        password: await CryptoService.hash('password'),
        activationToken: '4',
        status: UserStatus.Pending,
      },
    });

    const newProject = await prismaClient.project.create({
      data: {
        uuid: '1',
        name: 'Project from seeding',
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: newProject.uuid,
        userId: marvin.uuid,
        role: UserRoles.Admin,
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: newProject.uuid,
        userId: john.uuid,
        role: UserRoles.User,
      },
    });

    const productionEnv = await prismaClient.environment.create({
      data: {
        uuid: '1',
        name: 'Production',
        projectId: newProject.uuid,
        clientKey: 'valid-sdk-key',
      },
    });

    await prismaClient.environment.create({
      data: {
        uuid: '2',
        name: 'Developer',
        projectId: newProject.uuid,
        clientKey: 'valid-sdk-key-2',
      },
    });

    const homePageFlag = await prismaClient.flag.create({
      data: {
        uuid: '1',
        name: 'New homepage',
        description: 'Switch the new homepage design',
        key: 'newHomepage',
      },
    });

    const flagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: productionEnv.uuid,
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

    await seedHits(flagEnv, new Date(1992, 0, 1, 1), 10);
    await seedHits(flagEnv, new Date(1992, 0, 3, 1), 20);
    await seedHits(flagEnv, new Date(1992, 0, 2, 1), 40);
    await seedHits(flagEnv, new Date(1992, 0, 6, 1), 10);
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
