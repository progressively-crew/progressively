import { exec } from "node:child_process";

require("dotenv").config();

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

exec(
  `npx prisma migrate diff --from-url "${dbUrl}" --shadow-database-url "${shadowUrl}" --to-migrations ./prisma/migrations --script > backward.sql`,
  (error, stdout) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    console.log(`Diff generated, you can open ./backward.sql`);
  }
);
