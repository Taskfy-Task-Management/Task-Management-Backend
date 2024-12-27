-- DropForeignKey
ALTER TABLE `watchlist` DROP FOREIGN KEY `Watchlist_taskId_fkey`;

-- DropIndex
DROP INDEX `Watchlist_taskId_fkey` ON `watchlist`;

-- AddForeignKey
ALTER TABLE `Watchlist` ADD CONSTRAINT `Watchlist_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
