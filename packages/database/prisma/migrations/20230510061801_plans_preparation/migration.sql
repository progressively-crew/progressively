-- AlterTable
ALTER TABLE "User" ADD COLUMN     "trialEnd" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Plan" (
    "uuid" TEXT NOT NULL,
    "projectCount" INTEGER NOT NULL,
    "environmentCount" INTEGER NOT NULL,
    "evaluationCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "userUuid" TEXT,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
