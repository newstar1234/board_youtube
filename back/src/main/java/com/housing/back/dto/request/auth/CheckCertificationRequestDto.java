package com.housing.back.dto.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
public class CheckCertificationRequestDto {
  
  @NotBlank
  private String id;

  @Email
  @NotBlank
  private String email;
  
  @NotBlank
  private String certificationNumber;

}
