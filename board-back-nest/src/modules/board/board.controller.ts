import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PatchBoardRequestDto, PostBoardRequestDto } from './dto/request';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { GetSignInUser } from 'decorator';
import { GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from './dto/response';

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

  @Get('/:boardNumber')
  getBoard(
    @Param('boardNumber') boardNumber: number
  ) :Promise<GetBoardResponseDto> {
    const response = this.boardService.getBoard(boardNumber);
    return response;
  }

  @Patch('/:boardNumber')
  @UseGuards(JwtAuthGuard)
  patchBoard(
    @Body() requestBody : PatchBoardRequestDto,
    @Param('boardNumber') boardNumber:number,
    @GetSignInUser() email: string
  ):Promise<PatchBoardResponseDto> {
    const response = this.boardService.patchBoard(requestBody, boardNumber, email);
    return response;
  }

}
