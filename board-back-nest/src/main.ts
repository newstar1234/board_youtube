import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { HttpExceptionFilter } from 'filter';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); // http exception filter 적용
  app.enableCors();  // 모든 Cors 허용
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
