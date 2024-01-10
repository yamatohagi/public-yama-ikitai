-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mtTrailheadId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtTrailheadId_fkey" FOREIGN KEY ("mtTrailheadId") REFERENCES "Trailhead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
