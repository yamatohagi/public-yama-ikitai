-- DropForeignKey
ALTER TABLE "AfterClimbMeal" DROP CONSTRAINT "AfterClimbMeal_mtId_fkey";

-- DropForeignKey
ALTER TABLE "AfterClimbSpa" DROP CONSTRAINT "AfterClimbSpa_mtId_fkey";

-- DropForeignKey
ALTER TABLE "MountainFeature" DROP CONSTRAINT "MountainFeature_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "MountainToMtFacility" DROP CONSTRAINT "MountainToMtFacility_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "MountainToPhoto" DROP CONSTRAINT "MountainToPhoto_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "MountainToTrailhead" DROP CONSTRAINT "MountainToTrailhead_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "MountainUrlMemo" DROP CONSTRAINT "MountainUrlMemo_mountainId_fkey";

-- DropForeignKey
ALTER TABLE "PhotoLabel" DROP CONSTRAINT "PhotoLabel_mtId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mtId_fkey";

-- AddForeignKey
ALTER TABLE "AfterClimbMeal" ADD CONSTRAINT "AfterClimbMeal_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AfterClimbSpa" ADD CONSTRAINT "AfterClimbSpa_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainUrlMemo" ADD CONSTRAINT "MountainUrlMemo_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainFeature" ADD CONSTRAINT "MountainFeature_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToPhoto" ADD CONSTRAINT "MountainToPhoto_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoLabel" ADD CONSTRAINT "PhotoLabel_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToTrailhead" ADD CONSTRAINT "MountainToTrailhead_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MountainToMtFacility" ADD CONSTRAINT "MountainToMtFacility_mountainId_fkey" FOREIGN KEY ("mountainId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
