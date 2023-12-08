package com.example.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;
import com.example.boardback.entity.BoardEntity;
import com.example.boardback.entity.ImageEntity;
import com.example.boardback.repository.BoardRepository;
import com.example.boardback.repository.ImageRepository;
import com.example.boardback.repository.UserRepository;
import com.example.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
  
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final ImageRepository imageRepository;

  @Override
  public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {

    try {

      // description : 이메일 존재여부 검증 //
      boolean existedEmail = userRepository.existsByEmail(email);
      if(!existedEmail) return PostBoardResponseDto.notExistUser();

      // description : 게시물 작성 //
      BoardEntity boardEntity = new BoardEntity(dto, email);
      boardRepository.save(boardEntity);

      // description : 게시물 이미지 작성 //
      int boardNumber = boardEntity.getBoardNumber();

      List<String> boardImageList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for(String image: boardImageList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }

      imageRepository.saveAll(imageEntities);

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return PostBoardResponseDto.success();
  }
  


}
