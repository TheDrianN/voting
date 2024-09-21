/*
  Warnings:

  - Made the column `user_id` on table `votes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `votes` MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `group_candidates_id` INTEGER NULL;
