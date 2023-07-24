/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Classroom` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classroom" DROP CONSTRAINT "Classroom_teacherId_fkey";

-- AlterTable
ALTER TABLE "Classroom" DROP COLUMN "teacherId";

-- CreateTable
CREATE TABLE "_ClassroomToTeacher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassroomToTeacher_AB_unique" ON "_ClassroomToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassroomToTeacher_B_index" ON "_ClassroomToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_ClassroomToTeacher" ADD CONSTRAINT "_ClassroomToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "Classroom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassroomToTeacher" ADD CONSTRAINT "_ClassroomToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
