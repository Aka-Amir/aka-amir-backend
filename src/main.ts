import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MongooseInterceptor } from './core/interceptors/mongoose.interceptor';
import { mkdirSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new MongooseInterceptor());
  try {
    mkdirSync(join(__dirname, '.', 'public'));
  } catch (e) {
    // ignore..
  }
  await app.listen(3000);
}
bootstrap();
