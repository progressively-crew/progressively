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
  const marvinData = prismaClient.user.create({
    data: {
      uuid: "1",
      fullname: "Marvin Frachet",
      email: "marvin.frachet@something.com",
      password: await CryptoService.hash("password"),
      activationToken: "1",
      status: "Active",
    },
  });

  const johnData = prismaClient.user.create({
    data: {
      uuid: "2",
      fullname: "John Doe",
      email: "john.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "3",
      status: "Active",
    },
  });

  const janeData = prismaClient.user.create({
    data: {
      fullname: "Jane Doe",
      email: "jane.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "2",
      status: "Active",
    },
  });

  const joeData = prismaClient.user.create({
    data: {
      fullname: "Joe Doe",
      email: "joe.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "11",
      status: "Active",
    },
  });

  const ginaData = prismaClient.user.create({
    data: {
      uuid: "4",
      fullname: "Gina Doe",
      email: "gina.doe@gmail.com",
      password: await CryptoService.hash("password"),
      activationToken: "4",
      status: "Pending",
    },
  });

  const withoutFullNameData = prismaClient.user.create({
    data: {
      uuid: "5",
      fullname: "",
      email: "without.fullname@gmail.com",
      password: await CryptoService.hash(`password`),
      activationToken: "",
      status: "Active",
    },
  });

  return Promise.all([
    marvinData,
    johnData,
    janeData,
    withoutFullNameData,
    joeData,
    ginaData,
  ]);
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
