import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { PrismaClient, User } from "@prisma/client";

class CryptoService {
  static async hash(toHash: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(toHash, saltOrRounds);
  }

  static sha256(plainText: string) {
    return crypto.createHash("sha256").update(plainText).digest("base64");
  }

  static async isHashEqual(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }
}

export const seedUsers = async (prismaClient: PrismaClient) => {
  const marvin = await prismaClient.user.create({
    data: {
      uuid: "1",
      fullname: "Marvin Frachet",
      email: "marvin.frachet@something.com",
      password: await CryptoService.hash("password"),
      activationToken: "1",
      status: "Active",
    },
  });

  const john = await prismaClient.user.create({
    data: {
      uuid: "2",
      fullname: "John Doe",
      email: "john.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "3",
      status: "Active",
    },
  });

  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 14);

  const jane = await prismaClient.user.create({
    data: {
      fullname: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "2",
      status: "Active",
      trialEnd,
    },
  });

  const joe = await prismaClient.user.create({
    data: {
      fullname: "Joe Doe",
      email: "joe.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "11",
      status: "Active",
    },
  });

  const gina = await prismaClient.user.create({
    data: {
      uuid: "4",
      fullname: "Gina Doe",
      email: "gina.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "4",
      status: "Pending",
    },
  });

  const withoutFullName = await prismaClient.user.create({
    data: {
      uuid: "5",
      fullname: "",
      email: "without.fullname@gmail.com",
      password: await CryptoService.hash(`password`),
      activationToken: "",
      status: "Active",
    },
  });

  return [marvin, john, jane, gina, withoutFullName] as const;
};

export const seedPasswordReset = async (
  prismaClient: PrismaClient,
  user: User
) => {
  const dateEnd = new Date();
  // In case tests take time...
  dateEnd.setMinutes(dateEnd.getMinutes() + 1000);
  await prismaClient.passwordResetTokens.create({
    data: {
      dateEnd,
      token: CryptoService.sha256("1"),
      userUuid: user.uuid,
    },
  });
};
