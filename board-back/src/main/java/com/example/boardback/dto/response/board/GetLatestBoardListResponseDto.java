package com.example.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.boardback.common.ResponseCode;
import com.example.boardback.common.ResponseMessage;
import com.example.boardback.dto.object.BoardListItem;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.entity.BoardListViewEntity;

import lombok.Getter;

@Getter
public class GetLatestBoardListResponseDto extends ResponseDto {
  
  private List<BoardListItem> latestList;

  private GetLatestBoardListResponseDto(List<BoardListViewEntity> boardEntities) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.latestList = BoardListItem.getList(boardEntities);
  }

  public static ResponseEntity<GetLatestBoardListResponseDto> success(List<BoardListViewEntity> boardEntities) {
    GetLatestBoardListResponseDto result = new GetLatestBoardListResponseDto(boardEntities);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }
}
