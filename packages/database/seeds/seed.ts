import { PrismaClient } from "@prisma/client";
import { seedActivity } from "./activity";
import { seedFlagHits, seedFlagHitsVariants, seedFlags } from "./flags";
import { seedProjects } from "./projects";
import { seedPasswordReset, seedUsers } from "./users";
import { seedHitEvents } from "./env";

const prismaClient = new PrismaClient();

const guardSeeding = () => {
  const dbUrl = process.env.DATABASE_URL;
  const isProduction = dbUrl && !dbUrl.includes("localhost");

  if (isProduction) {
    throw new Error(
      "\nYou are trying to run an operation on a production database. It's aborted :).\n"
    );
  }
};

export const seedDb = async () => {
  guardSeeding();
  await prismaClient.$connect();

  try {
    // Initial seeding
    const [marvin, john, jane] = await seedUsers(prismaClient);
    const [projectFromSeeding, otherFromSeeding] = await seedProjects(
      prismaClient
    );

    await seedPasswordReset(prismaClient, john); // Necessary to e2e test password reset

    //  Contextual seeding
    const production = await prismaClient.environment.create({
      data: {
        uuid: "1",
        name: "Production",
        projectId: projectFromSeeding.uuid,
        clientKey: "valid-sdk-key",
        secretKey: "secret-key",
        domain: "**",
      },
    });

    await prismaClient.environment.create({
      data: {
        uuid: "2",
        name: "Developer",
        projectId: projectFromSeeding.uuid,
        clientKey: "valid-sdk-key-2",
        secretKey: "secret-key-2",
        domain: "hello-world",
      },
    });

    const otherEnv = await prismaClient.environment.create({
      data: {
        uuid: "3",
        name: "Staging",
        projectId: otherFromSeeding.uuid,
        clientKey: "valid-sdk-key-3",
        secretKey: "secret-key-3",
        domain: "**",
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: projectFromSeeding.uuid,
        userId: marvin.uuid,
        role: "admin",
      },
    });

    await prismaClient.userProject.create({
      data: {
        projectId: projectFromSeeding.uuid,
        userId: john.uuid,
        role: "user",
      },
    });

    // Flag setup
    const [homePageFlag, footerFlag, asideFlag, multiVariate] = await seedFlags(
      prismaClient
    );

    const flagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: homePageFlag.uuid,
        webhooks: {
          create: {
            uuid: "1",
            endpoint: "http://localhost:4000",
            secret: "this is secret",
            event: "ACTIVATION",
          },
        },
      },
    });

    await seedActivity(flagEnv, prismaClient);

    const footerFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: footerFlag.uuid,
        status: "ACTIVATED",
      },
    });

    const otherFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: otherEnv.uuid,
        flagId: asideFlag.uuid,
      },
    });

    // Multi variate setup

    const multiVariateFlagEnv = await prismaClient.flagEnvironment.create({
      data: {
        environmentId: production.uuid,
        flagId: multiVariate.uuid,
        status: "NOT_ACTIVATED",
      },
    });

    const firstVariant = await prismaClient.variant.create({
      data: {
        uuid: "1",
        isControl: true,
        value: "Control",
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });

    const secondVariant = await prismaClient.variant.create({
      data: {
        uuid: "2",
        isControl: false,
        value: "Second",
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
      },
    });

    // End of multi variate setup

    await prismaClient.strategy.create({
      data: {
        uuid: "1",
        flagEnvironmentEnvironmentId: production.uuid,
        flagEnvironmentFlagId: homePageFlag.uuid,
        valueToServeType: "Boolean",
      },
    });

    await prismaClient.strategy.create({
      data: {
        uuid: "2",
        flagEnvironmentEnvironmentId: production.uuid,
        flagEnvironmentFlagId: footerFlag.uuid,
        valueToServe: undefined,
        valueToServeType: "Boolean",
        rolloutPercentage: 100,
        rules: {
          create: [
            {
              fieldName: "id",
              fieldComparator: "eq",
              fieldValue: "1",
            },
          ],
        },
      },
    });

    await prismaClient.strategy.create({
      data: {
        uuid: "3",
        flagEnvironmentEnvironmentId: multiVariateFlagEnv.environmentId,
        flagEnvironmentFlagId: multiVariateFlagEnv.flagId,
        valueToServeType: "Variant",
        variants: {
          create: [
            {
              variantUuid: firstVariant.uuid,
              rolloutPercentage: 50,
            },
            {
              variantUuid: secondVariant.uuid,
              rolloutPercentage: 50,
            },
          ],
        },
      },
    });

    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 1, 1), 10);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 3, 1), 20);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 2, 1), 40);
    await seedFlagHits(prismaClient, flagEnv, new Date(1992, 0, 6, 1), 10);

    await seedFlagHits(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 1, 1),
      10
    );

    await seedFlagHits(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 3, 1),
      20
    );
    await seedFlagHits(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 2, 1),
      40
    );
    await seedFlagHits(
      prismaClient,
      multiVariateFlagEnv,
      new Date(1992, 0, 6, 1),
      10
    );

    await seedFlagHitsVariants(prismaClient, multiVariateFlagEnv);
    await seedHitEvents(prismaClient, production);

    // End of Flag setup
  } catch (e) {
    console.error(e);
  }

  await prismaClient.$disconnect();
};

export const cleanupDb = async () => {
  guardSeeding();
  await prismaClient.$connect();
  const tablenames = await prismaClient.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  try {
    await prismaClient.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
  await prismaClient.$disconnect();
};
