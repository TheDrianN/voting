-- CreateTable
CREATE TABLE `VoteStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `users_id` INTEGER NOT NULL,
    `elections_id` INTEGER NOT NULL,
    `status` CHAR(1) NOT NULL,
    `browser` VARCHAR(255) NOT NULL,
    `latitud` VARCHAR(255) NOT NULL,
    `longitud` VARCHAR(255) NOT NULL,
    `datevote` TIMESTAMP(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Votes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sub_election_id` INTEGER NOT NULL,
    `vote_status_id` INTEGER NOT NULL,
    `group_candidates_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
