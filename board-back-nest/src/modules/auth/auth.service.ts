import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/request';
import { SignUpResponseDto } from './dto/response';
import { UserRepository } from 'modules/data-access/repository';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'modules/data-access/entities';

@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async signUp(dto: SignUpRequestDto) : Promise<SignUpResponseDto | void> {

    const { email, password, nickname, telNumber } = dto;

    const isExistEmail = await this.userRepository.existsByEmail(email);
    if(isExistEmail) return SignUpResponseDto.duplicateEmail();

    const isExistNickname = await this.userRepository.existsByNickname(nickname);
    if(isExistNickname) return SignUpResponseDto.duplicateNickname();

    const isExistTelNumber = await this.userRepository.existsByTelNumber(telNumber);
    if(isExistTelNumber) return SignUpResponseDto.duplicateTelNumber();

    const salt = await bcrypt.genSalt();
    const encodedPassword = await bcrypt.hash(password, salt); // 암호화
    dto.password = encodedPassword; // 원래 비밀번호에 암호화한 비밀번호 

    const userEntity: UserEntity = { ...dto, profileImage:null };
    await this.userRepository.save(userEntity);

    return SignUpResponseDto.success();
  }

}
