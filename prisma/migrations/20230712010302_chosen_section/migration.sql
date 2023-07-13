/*
  Warnings:

  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_newsletterId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_pageId_fkey";

-- DropTable
DROP TABLE "Page";

-- CreateTable
CREATE TABLE "ChosenSections" (
    "id" TEXT NOT NULL,
    "newsletterId" TEXT,

    CONSTRAINT "ChosenSections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChosenSections" ADD CONSTRAINT "ChosenSections_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "ChosenSections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
