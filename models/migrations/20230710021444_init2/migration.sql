/*
  Warnings:

  - You are about to drop the column `isFrequency` on the `InterventionMateriel` table. All the data in the column will be lost.
  - Added the required column `isBegin` to the `InterventionMateriel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterventionMateriel" DROP COLUMN "isFrequency",
ADD COLUMN     "isBegin" BOOLEAN NOT NULL;
