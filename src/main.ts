import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MongooseInterceptor } from './core/interceptors/mongoose.interceptor';
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AdminService } from './admin/admin.service';
import { EncryptionService } from './core/providers/encryption.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const adminService = app.get(AdminService);
  const encryption = app.get(EncryptionService);
  const port = config.get<number>('PORT');

  if (!(await adminService.HasAdmin())) {
    const default_admin = {
      username: 'aka-amir-admin',
      password: 'admin_of_aka_inc',
      id: '',
    };
    if (existsSync(__dirname + '/defaultAdmin.config.json')) {
      const response = JSON.parse(
        readFileSync(__dirname + '/defaultAdmin.config.json').toString() ||
          '{}',
      );
      default_admin.username = response?.username || default_admin.username;
      default_admin.password = response?.password || default_admin.password;
    }
    default_admin.id = await adminService.Create(
      default_admin.username,
      await encryption.PasswordEncryption(default_admin.password),
    );

    writeFileSync(
      __dirname + '/admin.log',
      `[${default_admin.id}] ${default_admin.username} ${default_admin.password}`,
    );

    console.log('[!] Created Default Admin !\n-- See login info in admin.log');
  }
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
