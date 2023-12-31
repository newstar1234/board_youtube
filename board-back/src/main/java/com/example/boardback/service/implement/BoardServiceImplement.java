package com.example.boardback.service.implement;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.boardback.dto.request.board.PatchBoardRequestDto;
import com.example.boardback.dto.request.board.PostBoardRequestDto;
import com.example.boardback.dto.request.board.PostCommentRequestDto;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.dto.response.board.DeleteBoardResponseDto;
import com.example.boardback.dto.response.board.GetBoardResponseDto;
import com.example.boardback.dto.response.board.GetCommentListResponseDto;
import com.example.boardback.dto.response.board.GetFavoriteListResponseDto;
import com.example.boardback.dto.response.board.GetLatestBoardListResponseDto;
import com.example.boardback.dto.response.board.GetTop3BoardListResponseDto;
import com.example.boardback.dto.response.board.GetUserBoardListResponseDto;
import com.example.boardback.dto.response.board.IncreaseViewCountResponseDto;
import com.example.boardback.dto.response.board.PatchBoardResponseDto;
import com.example.boardback.dto.response.board.PostBoardResponseDto;
import com.example.boardback.dto.response.board.PostCommentResponseDto;
import com.example.boardback.dto.response.board.PutFavoriteResponseDto;
import com.example.boardback.dto.response.search.GetSearchBoardListResponseDto;
import com.example.boardback.entity.BoardEntity;
import com.example.boardback.entity.BoardListViewEntity;
import com.example.boardback.entity.CommentEntity;
import com.example.boardback.entity.FavoriteEntity;
import com.example.boardback.entity.ImageEntity;
import com.example.boardback.entity.SearchLogEntity;
import com.example.boardback.repository.BoardListViewRepository;
import com.example.boardback.repository.BoardRepository;
import com.example.boardback.repository.CommentRepository;
import com.example.boardback.repository.FavoriteRepository;
import com.example.boardback.repository.ImageRepository;
import com.example.boardback.repository.SearchLogRepository;
import com.example.boardback.repository.UserRepository;
import com.example.boardback.repository.resultSet.GetBoardResultSet;
import com.example.boardback.repository.resultSet.GetCommentListResultSet;
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
  private final CommentRepository commentRepository;
  private final BoardListViewRepository boardListViewRepository;
  private final SearchLogRepository searchLogRepository;

   @Override
  public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

    GetBoardResultSet resultSet = null;
    List<ImageEntity> imageEntities = new ArrayList<>();
    
    try {
      // description : 게시물 번호가 없을 경우 검증 //
      resultSet = boardRepository.getBoard(boardNumber);
      if(resultSet == null) return GetBoardResponseDto.noExistBoard();

      imageEntities = imageRepository.findByBoardNumber(boardNumber);
      
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
  public ResponseEntity<? super GetCommentListResponseDto> getCommentList(Integer boardNumber) {

    List<GetCommentListResultSet> resultSets = new ArrayList<>();

    try {

      boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
      if(!existedBoard) return GetCommentListResponseDto.noExistedBoard();

      resultSets = commentRepository.getCommentList(boardNumber);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetCommentListResponseDto.success(resultSets);

  }

  @Override
  public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {

    List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

    try {
      boardListViewEntities = boardListViewRepository.findByOrderByWriteDatetimeDesc();
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return GetLatestBoardListResponseDto.success(boardListViewEntities);
  }

  @Override
  public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {

    List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

    try {

      Date beforeWeek = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
      SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
      String sevenDaysAgo = simpleDateFormat.format(beforeWeek);
      
      boardListViewEntities = boardListViewRepository.findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(sevenDaysAgo);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return GetTop3BoardListResponseDto.success(boardListViewEntities);
  }

  @Override
  public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(String searchWord, String preSearchWord) {

    List<BoardListViewEntity> boardListViewEntities = new ArrayList<>();

    try {

      boardListViewEntities = boardListViewRepository.findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(searchWord, searchWord);

      SearchLogEntity searchLogEntity = new SearchLogEntity(searchWord, preSearchWord, false);
      searchLogRepository.save(searchLogEntity);

      // 첫번째 검색인지 확인  null이 아니면 첫번째 검색이 아님 //
      boolean relation = preSearchWord != null;
      // 첫번째 검색을 하고 넘어온 경우 //
      if(relation) {
        searchLogEntity = new SearchLogEntity(preSearchWord, searchWord, relation);
        searchLogRepository.save(searchLogEntity);
      }
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetSearchBoardListResponseDto.success(boardListViewEntities);

  }

  @Override
  public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(String email) {

    List<BoardListViewEntity> boardListViewEntities = null;

    try {
      boolean existedUser = userRepository.existsByEmail(email);
      if(!existedUser) return GetUserBoardListResponseDto.noExistUser();

      boardListViewEntities = boardListViewRepository.findByWriterEmailOrderByWriteDatetimeDesc(email);

    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return GetUserBoardListResponseDto.success(boardListViewEntities);
    
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
  public ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Integer boardNumber, String email) {

    try {

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return PostCommentResponseDto.noExistBoard();

      boolean existedUser = userRepository.existsByEmail(email);
      if(!existedUser) return PostCommentResponseDto.noExistUser();

      CommentEntity commentEntity = new CommentEntity(dto, boardNumber, email);
      commentRepository.save(commentEntity);

      boardEntity.increaseCommentCount();
      boardRepository.save(boardEntity);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return PostCommentResponseDto.success();

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

  @Override
  public ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer boardNumber, String email) {

    try {

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return PatchBoardResponseDto.noExistBoard();

      boolean existedUser = userRepository.existsByEmail(email);
      if(!existedUser) return PatchBoardResponseDto.noExistUser();

      String writerEmail = boardEntity.getWriterEmail();
      boolean isWriter = writerEmail.equals(email);
      if(!isWriter) return PatchBoardResponseDto.noPermision();

      boardEntity.patchBoard(dto);
      boardRepository.save(boardEntity);

      imageRepository.deleteByBoardNumber(boardNumber);
      List<String> boardImageList = dto.getBoardImageList();
      List<ImageEntity> imageEntities = new ArrayList<>();

      for(String image : boardImageList) {
        ImageEntity imageEntity = new ImageEntity(boardNumber, image);
        imageEntities.add(imageEntity);
      }

      imageRepository.saveAll(imageEntities);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return PatchBoardResponseDto.success();
  }

  @Override
  public ResponseEntity<? super IncreaseViewCountResponseDto> inceaseViewCount(Integer boardNumber) {

    try {
      // description :  조회수 증가 //
      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return IncreaseViewCountResponseDto.noExistBoard();
      
      boardEntity.increaseViewCount();
      boardRepository.save(boardEntity);
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return IncreaseViewCountResponseDto.success();

  }

  @Override
  public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer boardNumber, String email) {
    
    try {

      boolean existedUser = userRepository.existsByEmail(email);
      if(!existedUser) return DeleteBoardResponseDto.noExistUser();

      BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
      if(boardEntity == null) return DeleteBoardResponseDto.noExistBoard();

      String writerEmail = boardEntity.getWriterEmail();
      boolean isWriter = writerEmail.equals(email);
      if(!isWriter) return DeleteBoardResponseDto.noPermission();

      imageRepository.deleteByBoardNumber(boardNumber);
      commentRepository.deleteByBoardNumber(boardNumber);
      favoriteRepository.deleteByBoardNumber(boardNumber);

      boardRepository.delete(boardEntity);

      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }
    return DeleteBoardResponseDto.success();
  }

}
