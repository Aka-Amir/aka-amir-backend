import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { SkillsModule } from './skills/skills.module';
import { SiteDataModule } from './site-data/site-data.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/aka_amir'),
    TicketsModule,
    BlogPostsModule,
    SkillsModule,
    SiteDataModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
