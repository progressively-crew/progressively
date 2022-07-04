import { PrismaClient, Variant } from '@prisma/client';

export const seedAbExperiments = async (prismaClient: PrismaClient) => {
  const homeExperiment = await prismaClient.experiment.create({
    data: {
      uuid: '1',
      name: 'New homepage experiment',
      description: 'Switch the new homepage design (experiment)',
      key: 'newHomepageExperiment',
    },
  });

  const controlVariant = await prismaClient.variant.create({
    data: {
      uuid: '1',
      name: 'Control variant for home',
      description: 'Controls the homepage variant',
      key: 'control',
      experimentUuid: homeExperiment.uuid,
    },
  });

  const alternativeHomepage = await prismaClient.variant.create({
    data: {
      uuid: '2',
      name: 'Alternative homepage',
      description: 'Alternative homepage',
      key: 'alternative',
      experimentUuid: homeExperiment.uuid,
    },
  });

  const otherExperiment = await prismaClient.experiment.create({
    data: {
      uuid: '2',
      name: 'New other experiment',
      description: 'Switch the new other design (experiment)',
      key: 'otherHomepageExperiment',
    },
  });

  const footerExperiment = await prismaClient.experiment.create({
    data: {
      uuid: '3',
      name: 'New footer experiment',
      description: 'Switch the new footer design (experiment)',
      key: 'otherFooterExperiment',
    },
  });

  await seedVariantHits(
    prismaClient,
    controlVariant,
    alternativeHomepage,
    new Date(1992, 0, 1, 1),
    10,
  );

  await seedVariantHits(
    prismaClient,
    controlVariant,
    alternativeHomepage,
    new Date(1992, 0, 3, 1),
    20,
  );

  await seedVariantHits(
    prismaClient,
    controlVariant,
    alternativeHomepage,
    new Date(1992, 0, 2, 1),
    40,
  );

  await seedVariantHits(
    prismaClient,
    controlVariant,
    alternativeHomepage,
    new Date(1992, 0, 6, 1),
    10,
  );

  return [homeExperiment, footerExperiment] as const;
};

const seedVariantHits = async (
  prismaClient: PrismaClient,
  control: Variant,
  variant: Variant,
  date: Date,
  count = 10,
) => {
  date.setHours(2);
  date.setMinutes(2);
  date.setSeconds(2);
  date.setMilliseconds(2);

  for (let i = 0; i < count; i++) {
    await prismaClient.variantHit.create({
      data: {
        variantUuid: variant.uuid,
        date,
      },
    });

    if (i < count / 2) {
      await prismaClient.variantHit.create({
        data: {
          variantUuid: control.uuid,
          date,
        },
      });
    }
  }
};
