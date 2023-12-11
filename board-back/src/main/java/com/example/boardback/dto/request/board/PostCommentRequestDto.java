package com.example.boardback.dto.request.board;

import javax.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostCommentRequestDto {
  
  @NotBlank
  private String content;
  // int | boolean은 NotBlank 사용 못 함! //

}
