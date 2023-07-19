/*
  Warnings:

  - You are about to drop the column `nId` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_teacherId_fkey";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "nId",
DROP COLUMN "teacherId",
ADD COLUMN     "isImage" BOOLEAN;
