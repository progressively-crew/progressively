/**
 * This is a command to generate users without validating by email.
 * Practical for experimenting
 */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prompts = require('prompts');
const prismaClient = new PrismaClient();

const hash = async (toHash) => {
  const saltOrRounds = 10;
  const hash = await bcrypt.hash(toHash, saltOrRounds);

  return hash;
};

(async () => {
  await prismaClient.$connect();

  const { email } = await prompts({
    type: 'text',
    name: 'email',
    message:
      "Type the user's email, (only useful for data consistency in this scenario)",
  });

  const { fullname } = await prompts({
    type: 'text',
    name: 'fullname',
    message: "Type the user's fullname",
  });

  const { password } = await prompts({
    type: 'password',
    name: 'password',
    message: "Type the user's password",
  });

  await prismaClient.user.create({
    data: {
      fullname,
      email,
      password: await hash(password),
      activationToken: null,
      status: 'Active',
    },
  });

  console.log(
    `The user ${fullname} with email ${email} has successfully been created.`,
  );

  await prismaClient.$disconnect();
})();
