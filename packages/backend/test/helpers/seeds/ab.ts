import { PrismaClient } from '@prisma/client';

export const seedAbExperiments = async (prismaClient: PrismaClient) => {
  const homeExperiment = await prismaClient.experiment.create({
    data: {
      uuid: '1',
      name: 'New homepage experiment',
      description: 'Switch the new homepage design (experiment)',
      key: 'newHomepageExperiment',
    },
  });

  const controlVariation = await prismaClient.variation.create({
    data: {
      uuid: '1',
      name: 'Control variation for home',
      description: 'Controls the homepage variation',
      key: 'control',
      experimentUuid: homeExperiment.uuid,
    },
  });

  const alternativeHomepage = await prismaClient.variation.create({
    data: {
      uuid: '2',
      name: 'Alternative homepage',
      description: 'Alternative homepage',
      key: 'alternative',
      experimentUuid: homeExperiment.uuid,
    },
  });

  await seedVariationHits(
    prismaClient,
    controlVariation,
    alternativeHomepage,
    new Date(1992, 0, 1, 1),
    10,
  );

  await seedVariationHits(
    prismaClient,
    controlVariation,
    alternativeHomepage,
    new Date(1992, 0, 3, 1),
    20,
  );

  await seedVariationHits(
    prismaClient,
    controlVariation,
    alternativeHomepage,
    new Date(1992, 0, 2, 1),
    40,
  );

  await seedVariationHits(
    prismaClient,
    controlVariation,
    alternativeHomepage,
    new Date(1992, 0, 6, 1),
    10,
  );

  return [homeExperiment] as const;
};

const seedVariationHits = async (
  prismaClient: PrismaClient,
  control: any,
  variation: any,
  date: Date,
  count = 10,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.variationHit.create({
      data: {
        variation,
        date,
      },
    });

    if (i < count / 2) {
      await prismaClient.variationHit.create({
        data: {
          variation: control,
          date,
        },
      });
    }
  }
};
