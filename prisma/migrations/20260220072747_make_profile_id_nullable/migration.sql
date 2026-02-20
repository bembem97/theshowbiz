/*
  Warnings:

  - A unique constraint covering the columns `[reviewId,userId]` on the table `reaction` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "titleInteraction" DROP CONSTRAINT "titleInteraction_profileId_fkey";

-- AlterTable
ALTER TABLE "titleInteraction" ALTER COLUMN "profileId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reaction_reviewId_userId_key" ON "reaction"("reviewId", "userId");

-- AddForeignKey
ALTER TABLE "titleInteraction" ADD CONSTRAINT "titleInteraction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
