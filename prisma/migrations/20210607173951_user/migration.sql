-- CreateTable
CREATE TABLE `User` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(191) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,
    `userPassword` VARCHAR(191) NOT NULL,
    `userIsBlocked` BOOLEAN NOT NULL DEFAULT false,
    `userIsActive` BOOLEAN NOT NULL DEFAULT true,
    `userCanChangePassword` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
