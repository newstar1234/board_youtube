import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PostBoardRequestDto } from './dto/request';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { GetSignInUser } from 'decorator';
import { PostBoardResponseDto } from './dto/response';

@Controller('/api/v1/board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  postBoard(
    @Body() requestBody: PostBoardRequestDto,
    @GetSignInUser() email: string
  ): Promise<PostBoardResponseDto> {
    const response = this.boardService.postBoard(requestBody, email);
    return response;
  }

}
