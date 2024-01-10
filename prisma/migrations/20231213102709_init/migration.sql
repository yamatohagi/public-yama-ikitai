-- CreateTable
CREATE TABLE "PhotoLabel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "photoId" INTEGER NOT NULL,
    "labelTop" INTEGER NOT NULL,
    "labelLeft" INTEGER NOT NULL,
    "mtId" INTEGER,

    CONSTRAINT "PhotoLabel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoLabel" ADD CONSTRAINT "PhotoLabel_mtId_fkey" FOREIGN KEY ("mtId") REFERENCES "Mountain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoLabel" ADD CONSTRAINT "PhotoLabel_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
