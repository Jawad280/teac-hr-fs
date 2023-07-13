/*
  Warnings:

  - You are about to drop the column `addressId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_addressId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
