import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from 'src/core/core.module';
import { BlogPostsController } from './blog-posts.controller';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsSchema, collectionName } from './schema/blog-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: collectionName,
        schema: BlogPostsSchema,
      },
    ]),
    CoreModule,
  ],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
