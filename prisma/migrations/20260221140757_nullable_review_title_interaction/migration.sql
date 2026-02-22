-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_titleInteractionId_fkey";

-- AlterTable
ALTER TABLE "review" ALTER COLUMN "titleInteractionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_titleInteractionId_fkey" FOREIGN KEY ("titleInteractionId") REFERENCES "titleInteraction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
