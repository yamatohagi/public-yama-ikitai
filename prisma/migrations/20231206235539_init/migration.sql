/*
  Warnings:

  - You are about to drop the column `remark` on the `Photo` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "uploadStatus" AS ENUM ('uploading', 'uploaded');

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "remark",
ADD COLUMN     "uploadStatus" TEXT NOT NULL DEFAULT 'uploaded';
