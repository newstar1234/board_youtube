import { Equals, IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export default class SignUpRequestDto {
  @IsNotEmpty()  // NotBlack 같음
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{11,13}$/) // 정규식
  telNumber: string;
  
  @IsNotEmpty()
  address : string;

  @IsOptional()  // 있으면 검증하고 없으면 검증하지마라
  addressDetail: string | null;

  @IsBoolean()
  @Equals(true) // 어떤 것과 같은지 체크하겠다 -> 이 경우는 true
  agreedPersonal : boolean;
}