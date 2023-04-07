import { join } from 'path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SkillsModule } from './skills/skills.module';
import { TicketsModule } from './tickets/tickets.module';
import { SiteDataModule } from './site-data/site-data.module';
import { CustomersModule } from './customers/customers.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { MediaModule } from './media/media.module';
import { FormsModule } from './forms/forms.module';
import { ConfigModule } from '@nestjs/config';
import { LayoutsModule } from './layouts/layouts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: process.env.FilePath || join(__dirname, '.', 'public'),
      serveRoot: '/static',
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/aka_amir'),
    TicketsModule,
    BlogPostsModule,
    SkillsModule,
    SiteDataModule,
    AdminModule,
    CustomersModule,
    MediaModule,
    FormsModule,
    LayoutsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
