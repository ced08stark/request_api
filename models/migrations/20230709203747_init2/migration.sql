/*
  Warnings:

  - You are about to drop the column `isFrequency` on the `InterventionLogiciel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InterventionLogiciel" DROP COLUMN "isFrequency",
ADD COLUMN     "isBegin" BOOLEAN NOT NULL DEFAULT false;
