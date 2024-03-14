import { PrismaClient } from "@prisma/client";

export const seedFlags = async (prismaClient: PrismaClient) => {
  const homePageFlag = await prismaClient.flag.create({
    data: {
      uuid: "1",
      name: "New homepage",
      description: "Switch the new homepage design",
      key: "newHomepage",
      projectUuid: "1",
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

  const footerFlag = await prismaClient.flag.create({
    data: {
      uuid: "2",
      name: "New footer",
      description: "Switch the new footer design",
      key: "newFooter",
      projectUuid: "1",
      status: "ACTIVATED",
    },
  });

  const asideFlag = await prismaClient.flag.create({
    data: {
      uuid: "3",
      name: "New aside",
      description: "Switch the new aside design",
      key: "newAside",
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
