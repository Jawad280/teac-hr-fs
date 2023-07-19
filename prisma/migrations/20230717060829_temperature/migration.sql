/*
  Warnings:

  - You are about to drop the column `nokName` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `nokNumber` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "temperature" TEXT;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "nokName",
DROP COLUMN "nokNumber",
ADD COLUMN     "dadName" TEXT,
ADD COLUMN     "dadNumber" TEXT,
ADD COLUMN     "helperName" TEXT,
ADD COLUMN     "helperNumber" TEXT,
ADD COLUMN     "momName" TEXT,
ADD COLUMN     "momNumber" TEXT;
