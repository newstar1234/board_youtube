import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import JwtAuthGuard from '../../guard/jwt-auth.guard';

@Controller('/api/v1/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Get()
  get() {
    return 'Hello Auth!!';
  }
}
