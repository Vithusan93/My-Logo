-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "script" TEXT NOT NULL DEFAULT '',
    "logoClassId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Task_logoClassId_fkey" FOREIGN KEY ("logoClassId") REFERENCES "LogoClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StudentTask" (
    "studentId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "script" TEXT NOT NULL DEFAULT '',
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER,

    PRIMARY KEY ("studentId", "taskId"),
    CONSTRAINT "StudentTask_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StudentTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
