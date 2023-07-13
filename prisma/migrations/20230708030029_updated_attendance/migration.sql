/*
  Warnings:

  - You are about to drop the column `classroomId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `isPresent` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_classroomId_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "classroomId",
DROP COLUMN "status",
ADD COLUMN     "isPresent" BOOLEAN NOT NULL,
ADD COLUMN     "reasonForAbsence" TEXT;
