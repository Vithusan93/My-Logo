/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `LogoClass` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LogoClass_link_key" ON "LogoClass"("link");
