/*
  Warnings:

  - The `index` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "index",
ADD COLUMN     "index" INTEGER;
