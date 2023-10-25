/*
  Warnings:

  - A unique constraint covering the columns `[userID,name]` on the table `Library` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Library_userID_name_key" ON "Library"("userID", "name");
