/*
  Warnings:

  - You are about to drop the column `fielValue` on the `RolloutStrategy` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RolloutStrategy" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "strategyRuleType" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "activationType" TEXT NOT NULL,
    "rolloutPercentage" INTEGER,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,
    CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment" ("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RolloutStrategy" ("activationType", "fieldComparator", "fieldName", "flagEnvironmentEnvironmentId", "flagEnvironmentFlagId", "name", "rolloutPercentage", "strategyRuleType", "uuid") SELECT "activationType", "fieldComparator", "fieldName", "flagEnvironmentEnvironmentId", "flagEnvironmentFlagId", "name", "rolloutPercentage", "strategyRuleType", "uuid" FROM "RolloutStrategy";
DROP TABLE "RolloutStrategy";
ALTER TABLE "new_RolloutStrategy" RENAME TO "RolloutStrategy";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
