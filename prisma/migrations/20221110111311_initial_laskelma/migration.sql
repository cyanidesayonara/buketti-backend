-- CreateTable
CREATE TABLE "Laskelma" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tyyppi" TEXT NOT NULL,
    "muutosId" INTEGER NOT NULL,
    "kanta" TEXT NOT NULL,
    "vuosi" TEXT NOT NULL,
    "kehysjako" TEXT NOT NULL,
    "arvo" INTEGER NOT NULL,

    CONSTRAINT "Laskelma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muutostyyppi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Muutostyyppi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Laskelma" ADD CONSTRAINT "Laskelma_muutosId_fkey" FOREIGN KEY ("muutosId") REFERENCES "Muutostyyppi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
