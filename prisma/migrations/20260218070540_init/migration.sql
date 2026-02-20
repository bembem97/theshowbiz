/*
  Warnings:

  - You are about to drop the `reaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "reaction" DROP CONSTRAINT "reaction_userId_fkey";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "helpful" BOOLEAN,
ALTER COLUMN "content" DROP NOT NULL;

-- DropTable
DROP TABLE "reaction";
