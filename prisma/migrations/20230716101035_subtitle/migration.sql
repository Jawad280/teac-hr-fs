/*
  Warnings:

  - Added the required column `subtitle` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "subtitle" TEXT NOT NULL;
