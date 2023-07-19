/*
  Warnings:

  - You are about to drop the column `gallery` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "gallery";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "sectionId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE SET NULL ON UPDATE CASCADE;
