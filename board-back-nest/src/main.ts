import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { HttpExceptionFilter } from 'filter';
import { ValidationPipe } from '@nestjs/common';
import { validationPipeConfig } from 'config';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter()); // http exception filter 적용
  app.useGlobalPipes(new ValidationPipe(validationPipeConfig)); // 스프링 컨트롤러의 @Valid -> 한번에 글로벌로 처리 / 기본적으로 제공해주는 response type으로 반환
  app.enableCors();  // 모든 Cors 허용

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
