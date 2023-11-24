import { Environment, PrismaClient } from "@prisma/client";

const SEED_ROUND_EVENT_HITS = process.env.SEED_ROUND_EVENT_HITS
  ? Number(process.env.SEED_ROUND_EVENT_HITS)
  : 90;

export const seedHitEvents = async (
  prismaClient: PrismaClient,
  env: Environment
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
      await prismaClient.event.create({
        data: {
          date,
          name: "Event A",
          visitorId: "1",
          environmentUuid: env.uuid,
        },
      });

      if (y < count / 2) {
        await prismaClient.event.create({
          data: {
            name: "Event B",
            environmentUuid: env.uuid,
            date,
            visitorId: "1",
          },
        });
      }
    }
  }
};
