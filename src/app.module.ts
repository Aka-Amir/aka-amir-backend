import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SkillsModule } from './skills/skills.module';
import { TicketsModule } from './tickets/tickets.module';
import { SiteDataModule } from './site-data/site-data.module';
import { CustomersModule } from './customers/customers.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/aka_amir'),
    TicketsModule,
    BlogPostsModule,
    SkillsModule,
    SiteDataModule,
    AdminModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
