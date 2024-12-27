import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchlistService {
  constructor(private prisma: PrismaService) {}

  async addToWatchlist(userId: number, taskId: number) {
    return this.prisma.watchlist.create({
      data: { userId, taskId },
    });
  }

  async removeFromWatchlist(userId: number, taskId: number) {
    return this.prisma.watchlist.deleteMany({
      where: { userId, taskId },
    });
  }

  async getWatchlist(userId: number) {
    return this.prisma.watchlist.findMany({
      where: { userId },
      include: { task: true }, // Include task details if needed
    });
  }
}
