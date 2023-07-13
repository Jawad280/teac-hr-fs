/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `Section` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_teacherId_fkey";

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "teacherId";

-- AlterTable
ALTER TABLE "Section" DROP COLUMN "teacherId",
ADD COLUMN     "createdBy" TEXT;
