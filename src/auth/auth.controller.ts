import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

/**
 * AuthController handles HTTP requests related to user authentication,
 * including registration and login.
 */
@Controller('auth')
export class AuthController {
  /**
   * Constructor for AuthController.
   * @param authService - The AuthService instance for handling authentication logic.
   */
  constructor(private authService: AuthService) {}

  /**
   * Registers a new user.
   * 
   * @route POST /auth/register
   * @param body - An object containing the user's name, email, and password.
   * @returns The newly created user object.
   */
  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.register(body);
  }

  /**
   * Logs in a user by validating their email and password.
   * 
   * @route POST /auth/login
   * @param body - An object containing the user's email and password.
   * @returns An object containing the JWT access token and user details.
   * @throws UnauthorizedException if the credentials are invalid.
   */
  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
