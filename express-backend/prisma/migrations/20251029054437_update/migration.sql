/*
  Warnings:

  - Added the required column `dates` to the `Bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookings" ADD COLUMN     "dates" TIMESTAMP(3) NOT NULL;
