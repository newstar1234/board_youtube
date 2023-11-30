package com.example.boardback.dto.request.auth;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {
  
  @NotBlank @Email// null이 아니면서 빈문자열이 아니고 공백이 아님
  private String email;
  @NotBlank @Size(min=8, max=20)
  private String password;
  @NotBlank
  private String nickname;
  @NotBlank @Pattern(regexp="^[0-9]{11,13}$")
  private String telNumber;
  @NotBlank
  private String address;

  private String addressDetail;
  @NotNull @AssertTrue // 참조형 변수에 사용할수있음
  private Boolean agreedPersonal;
}
