-- CreateTable
CREATE TABLE "Experiment" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "variationUuid" TEXT NOT NULL,

    CONSTRAINT "Experiment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Variation" (
    "uuid" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "experimentUuid" TEXT,

    CONSTRAINT "Variation_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "VariationHit" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "variationUuid" TEXT NOT NULL,

    CONSTRAINT "VariationHit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperimentEnvironment" (
    "experimentId" TEXT NOT NULL,
    "environmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'NOT_ACTIVATED',

    CONSTRAINT "ExperimentEnvironment_pkey" PRIMARY KEY ("experimentId","environmentId")
);

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_experimentUuid_fkey" FOREIGN KEY ("experimentUuid") REFERENCES "Experiment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariationHit" ADD CONSTRAINT "VariationHit_variationUuid_fkey" FOREIGN KEY ("variationUuid") REFERENCES "Variation"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentEnvironment" ADD CONSTRAINT "ExperimentEnvironment_environmentId_fkey" FOREIGN KEY ("environmentId") REFERENCES "Environment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperimentEnvironment" ADD CONSTRAINT "ExperimentEnvironment_experimentId_fkey" FOREIGN KEY ("experimentId") REFERENCES "Experiment"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
