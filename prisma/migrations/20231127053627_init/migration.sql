/*
  Warnings:

  - You are about to drop the column `interestEarned` on the `Enrollment` table. All the data in the column will be lost.
  - Added the required column `interestToEarn` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "interestEarned",
ADD COLUMN     "interestToEarn" DOUBLE PRECISION NOT NULL;
