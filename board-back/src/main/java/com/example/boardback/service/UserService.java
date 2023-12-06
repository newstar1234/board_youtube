package com.example.boardback.service;

import org.springframework.http.ResponseEntity;

import com.example.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
  
  ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);

}
