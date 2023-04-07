import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { exec } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { AdminService } from './admin/admin.service';
import { AppModule } from './app.module';
import { MongooseInterceptor } from './core/interceptors/mongoose.interceptor';
import { EncryptionService } from './core/providers/encryption.service';
import { LayoutsService } from './layouts/layouts.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const adminService = app.get(AdminService);
  const encryption = app.get(EncryptionService);
  const layout = app.get(LayoutsService);
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

  // if (
  //   process.argv.includes('--with-template') ||
  //   process.argv.includes('-wt')
  // ) {

  // }
  if (existsSync('../aka-amir-front/template.config.json')) {
    const templateConfig = JSON.parse(
      readFileSync('../aka-amir-front/template.config.json').toString() || '{}',
    );
    layout.createMany(templateConfig.layoutData).subscribe({
      next(response) {
        Logger.log('Created', 'TemplateContext');
        console.log(response);
      },
      error(e) {
        Logger.error(e, 'TemplateContext');
      },
    });
  } else {
    Logger.debug('No template config !');
  }
  const cp = exec('cd ../aka-amir-front && npm run template:activate', (e) => {
    if (e) {
      console.trace(e);
      process.exit(1);
    }
  });
  cp.stdout.on('data', (log) => {
    Logger.log(new String(log).trim(), 'Theme Context');
  });
  cp.stderr.on('data', (log) => {
    Logger.error(new String(log).trim(), 'Theme Context');
  });
  // setInterval(() => {

  // }, 1000);

  // setTimeout(() => {
  //   console.log('Killing the template');
  //   cp.kill('SIGKILL');
  // }, 10000);
  await app.listen(port);
}
bootstrap();
