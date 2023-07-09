/*
  Warnings:

  - You are about to drop the column `equipementId` on the `InterventionLogiciel` table. All the data in the column will be lost.
  - You are about to drop the column `equipementId` on the `InterventionMateriel` table. All the data in the column will be lost.
  - Added the required column `equipementLogicielId` to the `InterventionLogiciel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipementMaterielId` to the `InterventionMateriel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InterventionLogiciel" DROP CONSTRAINT "InterventionLogiciel_equipementId_fkey";

-- DropForeignKey
ALTER TABLE "InterventionMateriel" DROP CONSTRAINT "InterventionMateriel_equipementId_fkey";

-- AlterTable
ALTER TABLE "InterventionLogiciel" DROP COLUMN "equipementId",
ADD COLUMN     "equipementLogicielId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "InterventionMateriel" DROP COLUMN "equipementId",
ADD COLUMN     "equipementMaterielId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "InterventionMateriel" ADD CONSTRAINT "InterventionMateriel_equipementMaterielId_fkey" FOREIGN KEY ("equipementMaterielId") REFERENCES "EquipementMateriel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterventionLogiciel" ADD CONSTRAINT "InterventionLogiciel_equipementLogicielId_fkey" FOREIGN KEY ("equipementLogicielId") REFERENCES "EquipementLogiciel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
