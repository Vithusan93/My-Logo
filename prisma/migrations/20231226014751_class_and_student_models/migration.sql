-- CreateTable
CREATE TABLE "LogoClass" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "instructorId" INTEGER NOT NULL,
    "assistantInstructorId" INTEGER NOT NULL,
    CONSTRAINT "LogoClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LogoClass_assistantInstructorId_fkey" FOREIGN KEY ("assistantInstructorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ClassStudent" (
    "logoClassId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    PRIMARY KEY ("logoClassId", "studentId"),
    CONSTRAINT "ClassStudent_logoClassId_fkey" FOREIGN KEY ("logoClassId") REFERENCES "LogoClass" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ClassStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
