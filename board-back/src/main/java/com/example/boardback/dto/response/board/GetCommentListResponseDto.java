package com.example.boardback.dto.response.board;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.boardback.common.ResponseCode;
import com.example.boardback.common.ResponseMessage;
import com.example.boardback.dto.object.CommentListItem;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.repository.resultSet.GetCommentListResultSet;

import lombok.Getter;

@Getter
public class GetCommentListResponseDto extends ResponseDto {
  
  private List<CommentListItem> commentList;

  private GetCommentListResponseDto(List<GetCommentListResultSet> resultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
    this.commentList = CommentListItem.copyList(resultSets);
  }

  public static ResponseEntity<GetCommentListResponseDto> success(List<GetCommentListResultSet> resultSets) {
      GetCommentListResponseDto result = new GetCommentListResponseDto(resultSets);
      return ResponseEntity.status(HttpStatus.OK).body(result);
  }

  public static ResponseEntity<ResponseDto> noExistedBoard() {
    ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
  }

}
