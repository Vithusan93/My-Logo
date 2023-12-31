/*
  Warnings:

  - You are about to drop the `StudentTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentTask";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TaskResponse" (
    "studentId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "script" TEXT NOT NULL DEFAULT '',
    "isSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "points" INTEGER,

    PRIMARY KEY ("studentId", "taskId"),
    CONSTRAINT "TaskResponse_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TaskResponse_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
