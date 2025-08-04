-- CreateTable
CREATE TABLE `genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `platform` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `metascore` DOUBLE NOT NULL,
    `userScore` DOUBLE NOT NULL,
    `developer` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GameToGenre` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GameToGenre_AB_unique`(`A`, `B`),
    INDEX `_GameToGenre_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_GameToPlatform` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_GameToPlatform_AB_unique`(`A`, `B`),
    INDEX `_GameToPlatform_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_GameToGenre` ADD CONSTRAINT `_GameToGenre_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToGenre` ADD CONSTRAINT `_GameToGenre_B_fkey` FOREIGN KEY (`B`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPlatform` ADD CONSTRAINT `_GameToPlatform_A_fkey` FOREIGN KEY (`A`) REFERENCES `game`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_GameToPlatform` ADD CONSTRAINT `_GameToPlatform_B_fkey` FOREIGN KEY (`B`) REFERENCES `platform`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
