import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BlogPosts {
  @Prop({
    type: String,
  })
  html?: string;
  @Prop({
    type: Array,
  })
  content?: string[];

  @Prop({
    type: Array,
  })
  tags?: string[];

  @Prop({
    type: String,
  })
  image?: string;
}

export type BlogPostsDocument = BlogPosts & Document;
export const BlogPostsSchema = SchemaFactory.createForClass(BlogPosts);
export const collectionName = 'col_blog_posts';
