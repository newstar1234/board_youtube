import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from 'dotenv';

config();

@Injectable()
export default class JwtAuthStrategy extends PassportStrategy(Strategy) {
  
  constructor(){
    super({
      secretOrKey: process.env.SECRET_KET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(payload: any) {
  //   const { sub } = payload;
  //   const email = sub;
  //   return email;
  // }

  // 접근 주체 정보 반환 // @AuthenticationPrincipal
  async validate({ sub } :any) {
    return sub;
  }

}