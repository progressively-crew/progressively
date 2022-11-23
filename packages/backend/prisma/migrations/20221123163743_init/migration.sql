-- CreateTable
CREATE TABLE "Elligibility" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Elligibility_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Elligibility" ADD CONSTRAINT "Elligibility_flagEnvironmentFlagId_flagEnvironmentEnvironm_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
