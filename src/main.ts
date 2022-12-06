import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MongooseInterceptor } from './core/interceptors/mongoose.interceptor';
import { mkdirSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  console.log(port);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new MongooseInterceptor());
  try {
    mkdirSync(join(__dirname, '.', 'public'));
  } catch (e) {
    // ignore..
  }
  await app.listen(port);
}
bootstrap();
