package com.example.boardback.service.implement;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.dto.response.board.GetBoardResponseDto;
import com.example.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;
import com.example.boardback.dto.response.board.PutFavoriteResponseDto;
import com.example.boardback.entity.BoardEntity;
import com.example.boardback.entity.FavoriteEntity;
import com.example.boardback.entity.ImageEntity;
import com.example.boardback.repository.BoardRepository;
import com.example.boardback.repository.FavoriteRepository;
import com.example.boardback.repository.ImageRepository;
import com.example.boardback.repository.UserRepository;
import com.example.boardback.repository.resultSet.GetBoardResultSet;
import com.example.boardback.repository.resultSet.GetFavoriteListResultSet;
import com.example.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
  
  private final UserRepository userRepository;
  private final BoardRepository boardRepository;
  private final ImageRepository imageRepository;
  private final FavoriteRepository favoriteRepository;

   @Override
  public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

    GetBoardResultSet resultSet = null;
    List<ImageEntity> imageEntities = new ArrayList<>();
    
    try {
      // description : 게시물 번호가 없을 경우 검증 //
      resultSet = boardRepository.getBoard(boardNumber);
      if(resultSet == null) return GetBoardResponseDto.noExistBoard();

      imageEntities = imageRepository.findByBoardNumber(boardNumber);

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      // description :  조회수 증가 //
      boardEntity.increaseViewCount();
      boardRepository.save(boardEntity);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetBoardResponseDto.success(resultSet, imageEntities);

  }
  
  @Override
  public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Integer boardNumber) {
    
    List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

    try {

      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if(!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

      resultSets = favoriteRepository.getFavoriteList(boardNumber);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return GetFavoriteListResponseDto.success(resultSets);
  }

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

  @Override
  public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Integer boardNumber, String email) {

    try {

      boolean existedUser = userRepository.existsByEmail(email);
      if(!existedUser) return PutFavoriteResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

      FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
      // description : 좋아요 테이블이 null이면 저장, 데이터가 있으면 삭제 //
      if(favoriteEntity == null) {
        favoriteEntity = new FavoriteEntity(boardNumber, email);
        favoriteRepository.save(favoriteEntity);
        boardEntity.increaseFavoriteCount();;
      }
      else {
        favoriteRepository.delete(favoriteEntity);
        boardEntity.decreaseFavoriteCount();;
      }

      boardRepository.save(boardEntity);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return PutFavoriteResponseDto.success();

  }



}
