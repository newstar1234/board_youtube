package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.request.auth.SignInRequestDto;
import com.example.boardback.dto.request.auth.SignUpRequestDto;
import com.example.boardback.dto.response.auth.SignInResponseDto;
import com.example.boardback.dto.response.auth.SignUpResponseDto;

public interface AuthService {
  
  ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
  ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);

}
