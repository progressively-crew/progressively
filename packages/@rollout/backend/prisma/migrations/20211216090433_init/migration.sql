-- CreateTable
CREATE TABLE "RolloutStrategy" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "strategyRuleType" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldComparator" TEXT NOT NULL,
    "fielValue" TEXT NOT NULL,
    "activationType" TEXT NOT NULL,
    "rolloutPercentage" INTEGER NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,
    CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment" ("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE
);
