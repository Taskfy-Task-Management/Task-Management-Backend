import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

/**
 * AuthService handles user authentication, including registration, login,
 * and token generation.
 */
@Injectable()
export class AuthService {
  /**
   * Constructor for AuthService.
   * @param prisma - PrismaService instance for database operations.
   * @param jwtService - JwtService instance for JWT operations.
   */
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  /**
   * Registers a new user by hashing their password and saving their details
   * in the database.
   * 
   * @param data - Object containing the user's name, email, and password.
   * @returns The created user object.
   */
  async register(data: { name: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  /**
   * Authenticates a user by verifying their email and password. If valid,
   * generates a JWT token for the user.
   * 
   * @param email - The user's email address.
   * @param password - The user's plain-text password.
   * @returns An object containing the JWT access token and user details.
   * @throws UnauthorizedException if the email or password is invalid.
   */
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }
}
