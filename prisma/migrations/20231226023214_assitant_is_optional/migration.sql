-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LogoClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "assistantInstructorId" INTEGER,
    CONSTRAINT "LogoClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LogoClass_assistantInstructorId_fkey" FOREIGN KEY ("assistantInstructorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_LogoClass" ("assistantInstructorId", "id", "instructorId", "link", "name", "password") SELECT "assistantInstructorId", "id", "instructorId", "link", "name", "password" FROM "LogoClass";
DROP TABLE "LogoClass";
ALTER TABLE "new_LogoClass" RENAME TO "LogoClass";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
