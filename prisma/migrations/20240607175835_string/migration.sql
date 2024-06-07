-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atividades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idTurma" TEXT NOT NULL,
    "idProfessor" TEXT NOT NULL,
    "nomeTurma" TEXT NOT NULL,
    "descricao" TEXT NOT NULL
);
INSERT INTO "new_Atividades" ("descricao", "id", "idProfessor", "idTurma", "nomeTurma") SELECT "descricao", "id", "idProfessor", "idTurma", "nomeTurma" FROM "Atividades";
DROP TABLE "Atividades";
ALTER TABLE "new_Atividades" RENAME TO "Atividades";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
