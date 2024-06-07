/*
  Warnings:

  - You are about to drop the `Atividades` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Atividades";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Atividade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTurma" TEXT NOT NULL,
    "idProfessor" TEXT NOT NULL,
    "nomeTurma" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
