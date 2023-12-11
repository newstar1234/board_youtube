package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.request.board.PostCommentRequestDto;
import com.example.boardback.dto.response.board.GetBoardResponseDto;
import com.example.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;
import com.example.boardback.dto.response.board.PostCommentResponseDto;
import com.example.boardback.dto.response.board.PutFavoriteResponseDto;

public interface BoardService {

  ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
  ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber);
  
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); 
  ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email); 

  ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email);

}
