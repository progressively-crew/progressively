/*
  Warnings:

  - You are about to drop the column `status` on the `FlagHit` table. All the data in the column will be lost.
  - You are about to drop the column `variantUuid` on the `FlagHit` table. All the data in the column will be lost.
  - Added the required column `valueResolved` to the `FlagHit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FlagHit" DROP CONSTRAINT "FlagHit_variantUuid_fkey";

-- AlterTable
ALTER TABLE "FlagHit" DROP COLUMN "status",
DROP COLUMN "variantUuid",
ADD COLUMN     "valueResolved" TEXT NOT NULL;
