/*
  Warnings:

  - Added the required column `modifiedAt` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `TaskProgress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "TaskProgress" ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL;
