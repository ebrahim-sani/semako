/*
  Warnings:

  - Added the required column `schemeTitle` to the `Enrollment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "schemeTitle" TEXT NOT NULL;
