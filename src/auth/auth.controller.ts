import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    return await this.authService.login(username, password);
  }
}
