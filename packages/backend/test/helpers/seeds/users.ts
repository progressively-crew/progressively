import { PrismaClient, User } from '@prisma/client';
import { UserStatus } from '../../../src/users/status';
import { CryptoService } from '../../../src/crypto/crypto.service';

export const seedUsers = async (prismaClient: PrismaClient) => {
  const marvin = await prismaClient.user.create({
    data: {
      uuid: '1',
      fullname: 'Marvin Frachet',
      email: 'marvin.frachet@something.com',
      password: await CryptoService.hash('password'),
      activationToken: '1',
      status: UserStatus.Active,
    },
  });

  const john = await prismaClient.user.create({
    data: {
      uuid: '2',
      fullname: 'John Doe',
      email: 'john.doe@gmail.com',
      password: await CryptoService.hash('password'),
      activationToken: '3',
      status: UserStatus.Active,
    },
  });

  const jane = await prismaClient.user.create({
    data: {
      fullname: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      password: await CryptoService.hash('password'),
      activationToken: '2',
      status: UserStatus.Active,
    },
  });

  const gina = await prismaClient.user.create({
    data: {
      uuid: '4',
      fullname: 'Gina Doe',
      email: 'gina.doe@gmail.com',
      password: await CryptoService.hash('password'),
      activationToken: '4',
      status: UserStatus.Pending,
    },
  });

  const withoutFullName = await prismaClient.user.create({
    data: {
      uuid: '5',
      fullname: '',
      email: 'without.fullname@gmail.com',
      password: await CryptoService.hash(`password`),
      activationToken: '',
      status: UserStatus.Active,
    },
  });

  return [marvin, john, jane, gina, withoutFullName] as const;
};

export const seedPasswordReset = async (
  prismaClient: PrismaClient,
  user: User,
) => {
  const dateEnd = new Date();
  // In case tests take time...
  dateEnd.setMinutes(dateEnd.getMinutes() + 1000);
  await prismaClient.passwordResetTokens.create({
    data: {
      dateEnd,
      token: CryptoService.sha256('1'),
      userUuid: user.uuid,
    },
  });
};
