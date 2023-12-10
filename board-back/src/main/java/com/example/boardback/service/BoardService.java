package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.response.board.GetBoardResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {

  ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber);
  ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email); 

}
