/*
  Warnings:

  - Added the required column `titleInteractionId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "titleInteractionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_titleInteractionId_fkey" FOREIGN KEY ("titleInteractionId") REFERENCES "titleInteraction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
