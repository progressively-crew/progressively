// Not perfect to import it, but having access to the prisma client is very convenient here
import { PrismaClient } from "../../../backend/test/helpers/prismaClient";
import { seedProjects } from "../../../backend/test/helpers/seeds/projects";
import { seedFlags } from "../../../backend/test/helpers/seeds/flags";
import { UserStatus } from "../../../backend/src/users/status";
import { CryptoService } from "../../../backend/src/crypto/crypto.service";
import { UserRoles } from "../../../backend/src/users/roles";
export { cleanupDb } from "../../../backend/test/helpers/seed";

const prismaClient = new PrismaClient();

export const seedDb = async (userCount: number) => {
  await prismaClient.$connect();

  const [projectFromSeeding] = await seedProjects(prismaClient);
  const [homePageFlag] = await seedFlags(prismaClient);

  const production = await prismaClient.environment.create({
    data: {
      uuid: "1",
      name: "Production",
      projectId: projectFromSeeding.uuid,
      clientKey: "valid-sdk-key",
    },
  });

  const homeFlagEnv = await prismaClient.flagEnvironment.create({
    data: {
      environmentId: production.uuid,
      flagId: homePageFlag.uuid,
      status: "ACTIVATED",
    },
  });

  await prismaClient.rolloutStrategy.create({
    data: {
      uuid: "1",
      flagEnvironmentFlagId: homeFlagEnv.flagId,
      flagEnvironmentEnvironmentId: homeFlagEnv.environmentId,
      name: "Super strategy",
      strategyRuleType: "default",
      activationType: "boolean",
    },
  });

  const userPromises = [];
  for (let i = 0; i < userCount; i++) {
    userPromises.push(
      prismaClient.user.create({
        data: {
          uuid: String(i),
          fullname: "User " + 1,
          email: `user+${i}@something.com`,
          password: await CryptoService.hash("password"),
          activationToken: String(i),
          status: UserStatus.Active,
        },
      })
    );
  }

  const marvin = await prismaClient.user.create({
    data: {
      uuid: "-1",
      fullname: "Marvin Frachet",
      email: `marvin.frachet@something.com`,
      password: await CryptoService.hash("password"),
      activationToken: "-1",
      status: UserStatus.Active,
    },
  });

  await prismaClient.userProject.create({
    data: {
      projectId: projectFromSeeding.uuid,
      userId: marvin.uuid,
      role: UserRoles.Admin,
    },
  });

  const userResults = await Promise.all(userPromises);

  const userProjectsPromises = userResults.map((u: any) =>
    prismaClient.userProject.create({
      data: {
        projectId: projectFromSeeding.uuid,
        userId: u.uuid,
        role: UserRoles.User,
      },
    })
  );

  await Promise.all(userProjectsPromises);
  console.log(`[Seeding]: User seeded: ${userProjectsPromises.length}\n\n\n`);

  await prismaClient.$disconnect();
};
