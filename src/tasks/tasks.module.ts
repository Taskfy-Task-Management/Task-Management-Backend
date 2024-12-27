import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule], 
  providers: [TasksService, PrismaService],
  controllers: [TasksController]
})
export class TasksModule {}
