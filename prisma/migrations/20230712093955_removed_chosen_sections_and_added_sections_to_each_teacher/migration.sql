/*
  Warnings:

  - You are about to drop the column `chosenSectionId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the `ChosenSections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChosenSections" DROP CONSTRAINT "ChosenSections_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_chosenSectionId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "chosenSectionId";

-- DropTable
DROP TABLE "ChosenSections";

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
