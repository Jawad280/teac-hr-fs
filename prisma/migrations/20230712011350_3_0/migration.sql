/*
  Warnings:

  - You are about to drop the column `pageId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "pageId",
ADD COLUMN     "chosenSectionId" TEXT;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_chosenSectionId_fkey" FOREIGN KEY ("chosenSectionId") REFERENCES "ChosenSections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
