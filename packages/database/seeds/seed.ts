import { PrismaClient } from "@prisma/client";
import { seedActivity } from "./activity";
import { seedFlags } from "./flags";
import { seedProjects } from "./projects";
import { seedPasswordReset, seedUsers } from "./users";
import { cleanupEvents } from "../scripts/setup-clickhouse";
import { seedEvents } from "./events";
import { seedFlagHits, seedFlagHitsVariants } from "./flaghits";

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

const SEED_ROUND_EVENT_HITS = process.env.SEED_ROUND_EVENT_HITS
  ? Number(process.env.SEED_ROUND_EVENT_HITS)
  : 90;

export const seedDb = async (opts?: { eventsCount?: number }) => {
  guardSeeding();

  await seedEvents(opts?.eventsCount || SEED_ROUND_EVENT_HITS);

  await prismaClient.$connect();

  try {
    // Initial seeding
    const [marvin, john, jane] = await seedUsers(prismaClient);
    const [projectFromSeeding, otherFromSeeding] = await seedProjects(
      prismaClient
    );

    await seedPasswordReset(prismaClient, john); // Necessary to e2e test password reset

    //  Contextual seeding

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

    await seedActivity(homePageFlag, prismaClient);

    // Multi variate setup
    const firstVariant = await prismaClient.variant.create({
      data: {
        uuid: "1",
        isControl: true,
        value: "Control",
        flagUuid: multiVariate.uuid,
      },
    });

    const secondVariant = await prismaClient.variant.create({
      data: {
        uuid: "2",
        isControl: false,
        value: "Second",
        flagUuid: multiVariate.uuid,
      },
    });

    // End of multi variate setup
    await prismaClient.strategy.create({
      data: {
        uuid: "1",
        flagUuid: homePageFlag.uuid,
        valueToServeType: "Boolean",
      },
    });

    await prismaClient.strategy.create({
      data: {
        uuid: "2",
        flagUuid: footerFlag.uuid,
        valueToServe: undefined,
        valueToServeType: "Boolean",
        rolloutPercentage: 100,
        rules: {
          create: [
            {
              fieldName: "id",
              fieldComparator: "eq",
              fieldValue: "1::ffff:127.0.0.1",
            },
          ],
        },
      },
    });

    await prismaClient.strategy.create({
      data: {
        uuid: "3",
        flagUuid: multiVariate.uuid,
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

    await seedFlagHits(homePageFlag, new Date(1992, 0, 1, 1), 10);
    await seedFlagHits(homePageFlag, new Date(1992, 0, 3, 1), 20);
    await seedFlagHits(homePageFlag, new Date(1992, 0, 2, 1), 40);
    await seedFlagHits(homePageFlag, new Date(1992, 0, 6, 1), 10);

    await seedFlagHits(multiVariate, new Date(1992, 0, 1, 1), 10);

    await seedFlagHits(multiVariate, new Date(1992, 0, 3, 1), 20);
    await seedFlagHits(multiVariate, new Date(1992, 0, 2, 1), 40);
    await seedFlagHits(multiVariate, new Date(1992, 0, 6, 1), 10);

    await seedFlagHitsVariants(
      multiVariate,
      opts?.eventsCount || SEED_ROUND_EVENT_HITS
    );

    // End of Flag setup
  } catch (e) {
    console.error(e);
  }

  await prismaClient.$disconnect();
};

export const cleanupDb = async () => {
  guardSeeding();
  await cleanupEvents();

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
