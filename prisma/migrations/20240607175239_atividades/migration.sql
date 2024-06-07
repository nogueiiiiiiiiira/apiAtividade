-- CreateTable
CREATE TABLE "Atividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTurma" INTEGER NOT NULL,
    "idProfessor" INTEGER NOT NULL,
    "nomeTurma" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
