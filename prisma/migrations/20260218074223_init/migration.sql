/*
  Warnings:

  - You are about to drop the column `helpful` on the `review` table. All the data in the column will be lost.
  - Made the column `content` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "helpful",
ALTER COLUMN "content" SET NOT NULL;

-- CreateTable
CREATE TABLE "reaction" (
    "id" TEXT NOT NULL,
    "helpful" BOOLEAN,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "reaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reaction_reviewId_key" ON "reaction"("reviewId");

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
