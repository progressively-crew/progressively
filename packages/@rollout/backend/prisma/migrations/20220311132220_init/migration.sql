/*
  Warnings:

  - You are about to drop the column `type` on the `FlagHit` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FlagHit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flagEnvironmentFlagId" TEXT NOT NULL,
    "flagEnvironmentEnvironmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment" ("flagId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FlagHit" ("date", "flagEnvironmentEnvironmentId", "flagEnvironmentFlagId", "id", "status") SELECT "date", "flagEnvironmentEnvironmentId", "flagEnvironmentFlagId", "id", "status" FROM "FlagHit";
DROP TABLE "FlagHit";
ALTER TABLE "new_FlagHit" RENAME TO "FlagHit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
