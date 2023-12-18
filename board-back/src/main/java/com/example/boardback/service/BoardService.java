package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.request.board.PatchBoardRequestDto;
import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.request.board.PostCommentRequestDto;
import com.example.boardback.dto.response.board.DeleteBoardResponseDto;
import com.example.boardback.dto.response.board.GetBoardResponseDto;
import com.example.boardback.dto.response.board.GetCommentListResponseDto;
import com.example.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.example.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.example.boardback.dto.response.board.GetTop3BoardListResponseDto;
import com.example.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.example.boardback.dto.response.board.PatchBoardResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;
import com.example.boardback.dto.response.board.PostCommentResponseDto;
import com.example.boardback.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {

  ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
  ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
  ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber);
  ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList();
  ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList();

  
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); 
  ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email); 

  ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);
  ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email);

  ResponseEntity<? super IncreaseViewCountResponseDto> inceaseViewCount(Integer boardNumber);

  ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String eamil);

}
