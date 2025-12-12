/*
  Warnings:

  - Added the required column `description` to the `Issues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Issues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Issues` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `issues` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` TEXT NOT NULL,
    ADD COLUMN `name` VARCHAR(255) NOT NULL,
    ADD COLUMN `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
