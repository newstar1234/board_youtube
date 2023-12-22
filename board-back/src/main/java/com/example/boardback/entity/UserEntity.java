package com.example.boardback.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.example.boardback.dto.request.auth.SignUpRequestDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user")
@Table(name = "user")
public class UserEntity {
  
  @Id
  private String email;
  private String password;
  private String nickname;
  private String telNumber;
  private String address;
  private String addressDetail;
  private String profileImage;
  private boolean agreedPersonal;

  public UserEntity (SignUpRequestDto dto) {
    this.email = dto.getEmail();
    this.password = dto.getPassword();
    this.nickname = dto.getNickname();
    this.telNumber = dto.getTelNumber();
    this.address = dto.getAddress();
    this.addressDetail = dto.getAddressDetail();
    this.agreedPersonal = dto.getAgreedPersonal();
  }

  // 닉네임 setter 만들어주는거 //
  public void setNickname(String nickname) {
    this.nickname = nickname;
  }
  // 프로필 이미지 setter 만들어주는거 //
  public void setProfileImage(String profileImage) {
    this.profileImage = profileImage;
  }

}
