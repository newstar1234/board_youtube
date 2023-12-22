package com.example.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.boardback.dto.response.ResponseDto;
import com.example.boardback.dto.response.user.GetSignInUserResponseDto;
import com.example.boardback.dto.response.user.GetUserResponseDto;
import com.example.boardback.entity.UserEntity;
import com.example.boardback.repository.UserRepository;
import com.example.boardback.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImplement implements UserService {

  private final UserRepository userRepository;
  

  @Override
  public ResponseEntity<? super GetUserResponseDto> getUser(String email) {

    UserEntity userEntity = null;

    try {

      userEntity = userRepository.findByEmail(email);
      if(userEntity == null) return GetUserResponseDto.noExistUser();

    } catch(Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetUserResponseDto.success(userEntity);
  }

  @Override
  public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {

    UserEntity userEntity = null;

    try {

      userEntity = userRepository.findByEmail(email);
      if(userEntity == null) return GetSignInUserResponseDto.notExistUser();
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return GetSignInUserResponseDto.success(userEntity);

  }
  
}
