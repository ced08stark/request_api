/*
  Warnings:

  - Added the required column `isView` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "isView" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "image" DROP NOT NULL;
