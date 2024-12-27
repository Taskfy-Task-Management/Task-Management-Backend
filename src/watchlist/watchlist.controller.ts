import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(private watchlistService: WatchlistService) {}

  @Post()
  async addToWatchlist(@Body() body: { userId: number; taskId: number }) {
    return this.watchlistService.addToWatchlist(body.userId, body.taskId);
  }

  @Delete()
  async removeFromWatchlist(@Body() body: { userId: number; taskId: number }) {
    return this.watchlistService.removeFromWatchlist(body.userId, body.taskId);
  }

  @Get(':userId')
  async getWatchlist(@Param('userId') userId: string) {
    return this.watchlistService.getWatchlist(Number(userId));
  }
}
