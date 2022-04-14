import { PrismaClient } from '@prisma/client';
import { CryptoService } from '../../src/crypto/crypto.service';
import { v4 as uuidv4 } from 'uuid';

const prismaClient = new PrismaClient();

export const createPasswordToken = async (userId: string, dateEnd: Date) => {
  await prismaClient.$connect();

  const rawToken = uuidv4();
  const hashedToken = await CryptoService.sha256(rawToken);

  await prismaClient.passwordResetTokens.create({
    data: {
      dateEnd,
      userUuid: userId,
      token: hashedToken,
    },
  });

  await prismaClient.$disconnect();

  return rawToken;
};
