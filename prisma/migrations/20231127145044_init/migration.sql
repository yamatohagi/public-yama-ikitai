/*
  Warnings:

  - A unique constraint covering the columns `[unverifiedEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "unverifiedEmail" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_unverifiedEmail_key" ON "User"("unverifiedEmail");
