import { exec } from "node:child_process";
import * as prompts from "prompts";

require("dotenv").config();

const execute = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        return reject(error);
      }

      console.log(stdout);
      return resolve(undefined);
    });
  });
};

const guardUrl = () => {
  const dbUrl = process.env.DATABASE_URL;
  const shadowUrl = process.env.SHADOW_DATABASE_URL;

  if (!dbUrl) {
    throw new Error("You must set a DATABASE_URL in your dotenv.");
  }

  if (!shadowUrl) {
    throw new Error(`You must set a SHADOW_DATABASE_URL in your dotenv. Run the following docker command: 
		
		$ docker run --name progressively-shadow -e POSTGRES_PASSWORD=admin -e POSTGRES_USER=admin -e POSTGRES_DB=progressively -p 5433:5432 -d postgres
	
		and add SHADOW_DATABASE_URL="postgresql://admin:admin@localhost:5433/progressively" to your dotenv
		
		`);
  }

  return { dbUrl, shadowUrl };
};

const main = async () => {
  const { dbUrl, shadowUrl } = guardUrl();

  const isDevelopmentMigration =
    dbUrl.includes("localhost") || shadowUrl.includes("localhost");

  if (isDevelopmentMigration) {
    console.info("\n\nℹ️ Running migration on DEVELOPMENT locally.\n\n");

    const { migrationName } = await prompts({
      type: "text",
      name: "migrationName",
      message: "Type the migration name",
    });

    const { confirmation } = await prompts({
      type: "confirm",
      name: "confirmation",
      message: `Can you confirm the local, in development migration "${migrationName}"?`,
      initial: true,
    });

    if (confirmation) {
      await execute(
        `npx prisma format && npx prisma migrate dev --name ${migrationName}`
      );
      return console.log("Migration executed locally.");
    }

    console.log("Migration aborted locally.");
  }

  console.info("\n\n⚠️ Running migration on PRODUCTION servers.\n\n");

  const { confirmation } = await prompts({
    type: "confirm",
    name: "confirmation",
    message: `Can you confirm the PRODUCTION migration?`,
    initial: true,
  });

  if (confirmation) {
    await execute(`npx prisma format && npx prisma migrate deploy`);
    return console.log("Migration executed in PRODUCTION.");
  }

  console.log("Migration aborted in PRODUCTION.");
};

main();
