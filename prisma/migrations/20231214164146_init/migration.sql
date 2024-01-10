-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mtId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;
