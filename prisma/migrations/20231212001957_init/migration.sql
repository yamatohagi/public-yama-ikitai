-- AlterTable
ALTER TABLE "Mountain" ADD COLUMN     "applicationAt" TIMESTAMP(3),
ADD COLUMN     "approvalAt" TIMESTAMP(3),
ADD COLUMN     "originId" INTEGER,
ADD COLUMN     "remandAt" TIMESTAMP(3);
