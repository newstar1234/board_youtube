package com.example.boardback.dto.response.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.boardback.common.ResponseCode;
import com.example.boardback.common.ResponseMessage;
import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.repository.resultSet.GetPopularListResultSet;

import lombok.Getter;

@Getter
public class GetPopularListResponseDto extends ResponseDto {
  
  private List<String> popularWordList;

  private GetPopularListResponseDto(List<GetPopularListResultSet> resultSets) {
    super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

    List<String> popularWordList = new ArrayList<>();
    for(GetPopularListResultSet resultSet: resultSets) {
      String popularWord = resultSet.getSearchWord();
      popularWordList.add(popularWord);
    }

    this.popularWordList = popularWordList;
  }
  
  public static ResponseEntity<GetPopularListResponseDto> success(List<GetPopularListResultSet> resultSets) {
    GetPopularListResponseDto result = new GetPopularListResponseDto(resultSets);
    return ResponseEntity.status(HttpStatus.OK).body(result);
  }

}
