-- AlterTable
ALTER TABLE "Flag" ADD COLUMN     "issueLink" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
