/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User.userEmail_unique` ON `User`(`userEmail`);
