/*
  Warnings:

  - Added the required column `pMetricUuid` to the `PMetricHit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PMetricHit" ADD COLUMN     "pMetricUuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PMetricHit" ADD CONSTRAINT "PMetricHit_pMetricUuid_fkey" FOREIGN KEY ("pMetricUuid") REFERENCES "PMetric"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
