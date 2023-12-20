package com.example.boardback.dto.response.search;

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
public class GetSearchBoardListResponseDto extends ResponseDto {
  
  private List<BoardListItem> searchList;
  
  private GetSearchBoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.searchList = BoardListItem.getList(boardListViewEntities);
  }

  public static ResponseEntity<GetSearchBoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
    GetSearchBoardListResponseDto result = new GetSearchBoardListResponseDto(boardListViewEntities);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
