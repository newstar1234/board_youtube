import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSignInUserResponseDto, GetUserResponseDto } from './dto/response';
import { GetSignInUser } from 'decorator';
import JwtAuthGuard from 'guard/jwt-auth.guard';

@Controller('/api/v1/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  getUser(
    @Param('email') email : string
  ):Promise<GetUserResponseDto> {
    const response = this.userService.getUser(email);
    return response;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getSignInUser(
    @GetSignInUser() email: string
  ):Promise<GetSignInUserResponseDto> {
    const response = this.userService.getSignInUser(email);
    return response;
  }

}
