import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  logIn() {
    return this.authService.logIn();
  }

  @Post('signup')
  signUp() {
    return this.authService.signUp();
  }
}
