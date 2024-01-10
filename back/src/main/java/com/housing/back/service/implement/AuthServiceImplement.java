package com.housing.back.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.housing.back.common.CertificationNumber;
import com.housing.back.dto.request.auth.EmailCertificationRequestDto;
import com.housing.back.dto.request.auth.IdCheckRequestDto;
import com.housing.back.dto.response.ResponseDto;
import com.housing.back.dto.response.auth.EmailCertificationResponseDto;
import com.housing.back.dto.response.auth.IdCheckResponseDto;
import com.housing.back.entity.CertificationEntity;
import com.housing.back.provider.EmailProvider;
import com.housing.back.repository.CertificationRepository;
import com.housing.back.repository.UserRepository;
import com.housing.back.service.AuthService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImplement implements AuthService{
  
  private final UserRepository userRepository;
  private final CertificationRepository certificationRepository;

  private final EmailProvider emailProvider;

  @Override // ID 중복 확인
  public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {

    try {

      String userId = dto.getId();
      boolean isExistId = userRepository.existsByUserId(userId);
      if(isExistId) return IdCheckResponseDto.duplicateId();
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return IdCheckResponseDto.success();

  }

  @Override
  public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestDto dto) {

    try {

      String userId = dto.getId();
      String email = dto.getEmail();

      boolean isExistId = userRepository.existsByUserId(userId);
      if(isExistId) return EmailCertificationResponseDto.duplicateId();
      
      String certificationNumber = CertificationNumber.getCertificationNumber(); // 임의의 4자리수 받아오기

      boolean isSuccessed = emailProvider.sendCertificationMail(email, certificationNumber);
      if(!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

      CertificationEntity certificationEntity = new CertificationEntity(userId, email, certificationNumber);
      certificationRepository.save(certificationEntity);
      
    } catch (Exception exception) {
      exception.printStackTrace();
      return ResponseDto.databaseError();
    }

    return EmailCertificationResponseDto.success();

  }
  
}
