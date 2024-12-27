import { Injectable, ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * WatchlistService manages operations related to a user's watchlist,
 * including adding tasks, removing tasks, and retrieving the watchlist.
 */
@Injectable()
export class WatchlistService {
  /**
   * Constructor for WatchlistService.
   * @param prisma - PrismaService instance for database operations.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Adds a task to a user's watchlist.
   * 
   * @param userId - The ID of the user adding the task.
   * @param taskId - The ID of the task to add.
   * @returns The created watchlist entry.
   */
  async addToWatchlist(userId: number, taskId: number) {
    // Check if the task is already in the user's watchlist
    const existingEntry = await this.prisma.watchlist.findUnique({
      where: {
        userId_taskId: { userId, taskId }, // Compound unique key
      },
    });

    if (existingEntry) {
      throw new ConflictException('This task is already in your watchlist.');
    }

    // Add the task to the watchlist
    return this.prisma.watchlist.create({
      data: { userId, taskId },
    });
  }

  /**
   * Removes a task from a user's watchlist.
   * 
   * @param userId - The ID of the user removing the task.
   * @param taskId - The ID of the task to remove.
   * @returns The count of watchlist entries deleted.
   */
  async removeFromWatchlist(userId: number, taskId: number) {
    return this.prisma.watchlist.deleteMany({
      where: { userId, taskId },
    });
  }

  /**
   * Retrieves all tasks in a user's watchlist.
   * 
   * @param userId - The ID of the user whose watchlist is being retrieved.
   * @returns An array of watchlist entries, each including associated task details.
   */
  async getWatchlist(userId: number) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      include: { task: true }, // Includes details of the tasks in the watchlist
    });
  }
}
