package com.housing.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.housing.back.dto.request.auth.IdCheckRequestDto;
import com.housing.back.dto.response.auth.IdCheckResponseDto;
import com.housing.back.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

// requestBody를 반환해주는 컨트롤러로 인식해줌
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
  
  private final AuthService authService;

  @PostMapping("/id-check")
  public ResponseEntity<? super IdCheckResponseDto> idCheck(
    @RequestBody @Valid IdCheckRequestDto requestBody
  ) {
    ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
    return response;
  }

}
