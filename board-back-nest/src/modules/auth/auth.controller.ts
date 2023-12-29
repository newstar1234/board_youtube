import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/request';
import { SignUpResponseDto } from './dto/response';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('/sign-up')
  signUp(@Body() requestBody: SignUpRequestDto) : Promise<SignUpResponseDto | void> {
    const response = this.authService.signUp(requestBody);
    return response;
  }

}
