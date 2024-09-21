-- CreateTable
CREATE TABLE `Votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_election_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `group_candidates_id` INTEGER NOT NULL,
    `date_vote` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
