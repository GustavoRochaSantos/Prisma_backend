-- CreateTable
CREATE TABLE `LogAccess` (
    `logAccessId` INTEGER NOT NULL AUTO_INCREMENT,
    `logAccessUserId` INTEGER NOT NULL,
    `logAccessMethod` VARCHAR(191) NOT NULL,
    `logAccessUrl` VARCHAR(191) NOT NULL,
    `logAccessYear` INTEGER NOT NULL,
    `logAccessMonth` INTEGER NOT NULL,
    `logAccessDay` INTEGER NOT NULL,
    `logAccessCreated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`logAccessId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
