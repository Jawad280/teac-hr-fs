/*
  Warnings:

  - A unique constraint covering the columns `[name,dob,address]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Student_name_dob_address_key" ON "Student"("name", "dob", "address");
