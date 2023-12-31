import { Injectable } from '@nestjs/common';
import { GetSignInUserResponseDto, GetUserResponseDto } from './dto/response';
import { UserRepository } from 'modules/data-access/repository';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository : UserRepository
  ){}

  async getUser(email:string):Promise<GetUserResponseDto> {

    const userEntity = await this.userRepository.findByEmail(email);
    if(!userEntity) GetUserResponseDto.noExistUser();

    return GetUserResponseDto.success(userEntity);
  }

  async getSignInUser(email:string):Promise<GetSignInUserResponseDto> {

    const userEntity = await this.userRepository.findByEmail(email);
    if(!userEntity) GetSignInUserResponseDto.noExistUser();
    
    return GetSignInUserResponseDto.success(userEntity);
  }

}
