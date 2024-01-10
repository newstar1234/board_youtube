package com.housing.back.service;

import org.springframework.http.ResponseEntity;

import com.housing.back.dto.request.auth.EmailCertificationRequestDto;
import com.housing.back.dto.request.auth.IdCheckRequestDto;
import com.housing.back.dto.response.auth.EmailCertificationResponseDto;
import com.housing.back.dto.response.auth.IdCheckResponseDto;

public interface AuthService {
  
  ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
  
  ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto);


}
