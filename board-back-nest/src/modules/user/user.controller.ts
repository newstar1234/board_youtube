import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetSignInUserResponseDto, GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from './dto/response';
import { GetSignInUser } from 'decorator';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from './dto/request';

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

  @Patch('/nickname')
  @UseGuards(JwtAuthGuard)
  patchNickname(
    @Body() requestBody: PatchNicknameRequestDto,
    @GetSignInUser() email: string
  ):Promise<PatchNicknameResponseDto> {
    const response = this.userService.patchNickname(requestBody, email);
    return response;
  }

  @Patch('/profile-image')
  @UseGuards(JwtAuthGuard)
  patchProfileImage(
    @Body() requestBody: PatchProfileImageRequestDto,
    @GetSignInUser() email: string
  ):Promise<PatchProfileImageResponseDto> {
    const response = this.userService.patchProfileImage(requestBody, email);
    return response;
  }


}
