/*
  Warnings:

  - You are about to drop the `Muutostyyppi` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `muutostyyppiId` to the `Laskelma` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Laskelma" DROP CONSTRAINT "Laskelma_muutosId_fkey";

-- AlterTable
ALTER TABLE "Laskelma" ADD COLUMN     "muutostyyppiId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Muutostyyppi";
