-- CreateTable
CREATE TABLE "Flag" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "FlagEnvironment" (
    "flagId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "status" TEXT DEFAULT 'NOT_ACTIVATED',
    "rolloutPercentage" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "FlagEnvironment_pkey" PRIMARY KEY ("flagId","environmentId")
);

-- CreateTable
CREATE TABLE "Webhook" (
    "uuid" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Variant" (
    "uuid" TEXT NOT NULL,
    "rolloutPercentage" INTEGER NOT NULL DEFAULT 100,
    "isControl" BOOLEAN NOT NULL,
    "value" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PMetric" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,
    "variantUuid" TEXT,

    CONSTRAINT "PMetric_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "PMetricHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,
    "pMetricUuid" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,

    CONSTRAINT "PMetricHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlagHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flagEnvironmentFlagId" TEXT NOT NULL,
    "flagEnvironmentEnvironmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "variantUuid" TEXT,
    "visitorId" TEXT NOT NULL,

    CONSTRAINT "FlagHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolloutStrategy" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "strategyRuleType" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "RolloutStrategy_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Eligibility" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fieldName" TEXT,
    "fieldComparator" TEXT,
    "fieldValue" TEXT,
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Eligibility_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "uuid" TEXT NOT NULL,
    "utc" TIMESTAMP(3) NOT NULL,
    "rolloutPercentage" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "schedulingStatus" TEXT NOT NULL DEFAULT 'NOT_RUN',
    "flagEnvironmentFlagId" TEXT,
    "flagEnvironmentEnvironmentId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_flagId_fkey" FOREIGN KEY ("flagId") REFERENCES "Flag"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagEnvironment" ADD CONSTRAINT "FlagEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMetric" ADD CONSTRAINT "PMetric_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMetric" ADD CONSTRAINT "PMetric_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMetricHit" ADD CONSTRAINT "PMetricHit_flagEnvironmentFlagId_flagEnvironmentEnvironmen_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PMetricHit" ADD CONSTRAINT "PMetricHit_pMetricUuid_fkey" FOREIGN KEY ("pMetricUuid") REFERENCES "PMetric"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_flagEnvironmentFlagId_flagEnvironmentEnvironmentId_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlagHit" ADD CONSTRAINT "FlagHit_variantUuid_fkey" FOREIGN KEY ("variantUuid") REFERENCES "Variant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolloutStrategy" ADD CONSTRAINT "RolloutStrategy_flagEnvironmentFlagId_flagEnvironmentEnvir_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eligibility" ADD CONSTRAINT "Eligibility_flagEnvironmentFlagId_flagEnvironmentEnvironme_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_flagEnvironmentFlagId_flagEnvironmentEnvironmentI_fkey" FOREIGN KEY ("flagEnvironmentFlagId", "flagEnvironmentEnvironmentId") REFERENCES "FlagEnvironment"("flagId", "environmentId") ON DELETE SET NULL ON UPDATE CASCADE;
