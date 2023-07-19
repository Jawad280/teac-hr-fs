-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "gallery" TEXT[],
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "subtitle" DROP NOT NULL;
