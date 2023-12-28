import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export default class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
      if(err || !user) throw err||new UnauthorizedException({ code: 'AF', message: 'Authorization Failed' });
      return user;
  }
}