import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './dto/request';
import JwtAuthGuard from 'guard/jwt-auth.guard';
import { GetSignInUser } from 'decorator';
import { GetBoardResponseDto, GetCommentListResponseDto, PatchBoardResponseDto, PostBoardResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from './dto/response';

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

  @Post('/:boardNumber/comment')
  @UseGuards(JwtAuthGuard)
  postComment(
    @Body() requestBody: PostCommentRequestDto,
    @Param('boardNumber') boardNumber: number,
    @GetSignInUser() email: string
  ):Promise<PostCommentResponseDto> {
    const response = this.boardService.postComment(requestBody, boardNumber, email);
    return response;
  }

  @Get('/:boardNumber')
  getBoard(
    @Param('boardNumber') boardNumber: number
  ) :Promise<GetBoardResponseDto> {
    const response = this.boardService.getBoard(boardNumber);
    return response;
  }

  @Get('/:boardNumber/comment-list')
  getCommentList(
    @Param('boardNumber') boardNumber:number
  ):Promise<GetCommentListResponseDto> {
    const response = this.boardService.getCommentList(boardNumber);
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

  @Put('/:boardNumber/favorite')
  @UseGuards(JwtAuthGuard)
  putFavorite(
    @Param('boardNumber') boardNumber:number,
    @GetSignInUser() email: string
  ):Promise<PutFavoriteResponseDto> {
    const response = this.boardService.putFavorite(boardNumber, email);
    return response;
  }

}
