/*
  Warnings:

  - Added the required column `vote_type` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `votes` ADD COLUMN `vote_type` VARCHAR(5) NOT NULL,
    MODIFY `user_id` INTEGER NULL;
