import { Flag, PrismaClient } from "@prisma/client";

const SEED_ROUND_EVENT_HITS = process.env.SEED_ROUND_EVENT_HITS
  ? Number(process.env.SEED_ROUND_EVENT_HITS)
  : 90;

export const seedFlags = async (prismaClient: PrismaClient) => {
  const homePageFlag = await prismaClient.flag.create({
    data: {
      uuid: "1",
      name: "New homepage",
      description: "Switch the new homepage design",
      key: "newHomepage",
      projectUuid: "1",
    },
  });

  const footerFlag = await prismaClient.flag.create({
    data: {
      uuid: "2",
      name: "New footer",
      description: "Switch the new footer design",
      key: "newFooter",
      projectUuid: "1",
    },
  });

  const asideFlag = await prismaClient.flag.create({
    data: {
      uuid: "3",
      name: "New aside",
      description: "Switch the new aside design",
      key: "newAside",
      projectUuid: "2",
    },
  });

  const multiVariate = await prismaClient.flag.create({
    data: {
      uuid: "4",
      name: "With multivariate",
      description: "Switch the multivariate flag",
      key: "multivariate",
      projectUuid: "1",
    },
  });

  return [homePageFlag, footerFlag, asideFlag, multiVariate] as const;
};

export const seedFlagHits = async (
  prismaClient: PrismaClient,
  flag: Flag,
  date: Date,
  count = 10
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.flagHit.create({
      data: {
        flagUuid: flag.uuid,
        valueResolved: "true",
        date,
        visitorId: "1",
      },
    });

    if (i < count / 2) {
      await prismaClient.flagHit.create({
        data: {
          flagUuid: flag.uuid,
          valueResolved: "false",
          date,
          visitorId: "1",
        },
      });
    }
  }
};

export const seedFlagHitsVariants = async (
  prismaClient: PrismaClient,
  flag: Flag
) => {
  // Modify this value to see more real logs on N days
  const dayCount = SEED_ROUND_EVENT_HITS;
  for (let i = 1; i <= dayCount; i++) {
    const date = new Date();
    date.setDate(date.getDate() - dayCount + i);

    date.setHours(2);
    date.setMinutes(2);
    date.setSeconds(2);
    date.setMilliseconds(2);

    const count = i / 2;

    for (let y = 0; y < count; y++) {
      await prismaClient.flagHit.create({
        data: {
          flagUuid: flag.uuid,
          valueResolved: "Control",
          date,
          visitorId: "1",
        },
      });

      if (y < count / 2) {
        await prismaClient.flagHit.create({
          data: {
            flagUuid: flag.uuid,
            valueResolved: "Second",
            date,
            visitorId: "1",
          },
        });
      }
    }
  }
};
