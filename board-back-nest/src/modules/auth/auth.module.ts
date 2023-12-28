import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtAuthStrategy from './jwt-auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { passportJwtConfig } from 'config';

@Module({
  imports: [PassportModule.register(passportJwtConfig)],
  controllers: [AuthController],
  providers: [JwtAuthStrategy, AuthService],
  exports: [JwtAuthStrategy]
})
export class AuthModule {}
 