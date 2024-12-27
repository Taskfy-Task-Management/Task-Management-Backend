import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { BadRequestException } from '@nestjs/common';
/**
 * WatchlistController handles HTTP requests related to managing a user's watchlist,
 * including adding tasks, removing tasks, and retrieving the watchlist.
 */
@Controller('watchlist')
export class WatchlistController {
  /**
   * Constructor for WatchlistController.
   * @param watchlistService - The WatchlistService instance for handling watchlist-related logic.
   */
  constructor(private watchlistService: WatchlistService) {}

  /**
   * Adds a task to a user's watchlist.
   * 
   * @route POST /watchlist
   * @param body - An object containing the userId and taskId.
   * @returns The newly created watchlist entry.
   */
  @Post()
  async addToWatchlist(@Body() body: { userId: number; taskId: number }) {
    const { userId, taskId } = body;
    if (!userId || !taskId) {
      throw new BadRequestException('Missing userId or taskId');
    }
    return this.watchlistService.addToWatchlist(userId, taskId);
  }

  /**
   * Removes a task from a user's watchlist.
   * 
   * @route DELETE /watchlist
   * @param body - An object containing the userId and taskId.
   * @returns The count of deleted entries.
   */
  @Delete()
  async removeFromWatchlist(@Body() body: { userId: number; taskId: number }) {
    return this.watchlistService.removeFromWatchlist(body.userId, body.taskId);
  }

  /**
   * Retrieves all tasks in a user's watchlist.
   * 
   * @route GET /watchlist/:userId
   * @param userId - The ID of the user whose watchlist is being retrieved.
   * @returns An array of watchlist entries, each including associated task details.
   */
  @Get(':userId')
  async getWatchlist(@Param('userId') userId: string) {
    return this.watchlistService.getWatchlist(Number(userId));
  }
}
