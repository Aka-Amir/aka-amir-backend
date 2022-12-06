import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [BlogPostsController],
  providers: [BlogPostsService],
})
export class BlogPostsModule {}
