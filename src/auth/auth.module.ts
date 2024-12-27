import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module'; // Import PrismaModule

import * as dotenv from 'dotenv';

dotenv.config(); 


@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with an environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
