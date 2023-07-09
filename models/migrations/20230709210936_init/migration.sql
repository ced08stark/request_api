-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materiel" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "marque" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Materiel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logiciel" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "licence" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "Logiciel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipementLogiciel" (
    "id" SERIAL NOT NULL,
    "logicielId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "EquipementLogiciel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipementMateriel" (
    "id" SERIAL NOT NULL,
    "materielId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "EquipementMateriel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RapportMateriel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "interventionMaterielId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "RapportMateriel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RapportLogiciel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "interventionLogicielId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "RapportLogiciel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterventionMateriel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "typeDiagnostique" TEXT NOT NULL,
    "isAssign" BOOLEAN NOT NULL,
    "isFrequency" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "equipementMaterielId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "InterventionMateriel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterventionLogiciel" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "typeDiagnostique" TEXT NOT NULL,
    "isAssign" BOOLEAN NOT NULL,
    "isBegin" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "equipementLogicielId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),

    CONSTRAINT "InterventionLogiciel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "EquipementLogiciel" ADD CONSTRAINT "EquipementLogiciel_logicielId_fkey" FOREIGN KEY ("logicielId") REFERENCES "Logiciel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipementLogiciel" ADD CONSTRAINT "EquipementLogiciel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipementMateriel" ADD CONSTRAINT "EquipementMateriel_materielId_fkey" FOREIGN KEY ("materielId") REFERENCES "Materiel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipementMateriel" ADD CONSTRAINT "EquipementMateriel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapportMateriel" ADD CONSTRAINT "RapportMateriel_interventionMaterielId_fkey" FOREIGN KEY ("interventionMaterielId") REFERENCES "InterventionMateriel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RapportLogiciel" ADD CONSTRAINT "RapportLogiciel_interventionLogicielId_fkey" FOREIGN KEY ("interventionLogicielId") REFERENCES "InterventionLogiciel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterventionMateriel" ADD CONSTRAINT "InterventionMateriel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterventionMateriel" ADD CONSTRAINT "InterventionMateriel_equipementMaterielId_fkey" FOREIGN KEY ("equipementMaterielId") REFERENCES "EquipementMateriel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterventionLogiciel" ADD CONSTRAINT "InterventionLogiciel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterventionLogiciel" ADD CONSTRAINT "InterventionLogiciel_equipementLogicielId_fkey" FOREIGN KEY ("equipementLogicielId") REFERENCES "EquipementLogiciel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
