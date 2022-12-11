import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePostDto } from './DTO/update-post.dto';
import { BlogPostsDocument, collectionName } from './schema/blog-post.schema';

@Injectable()
export class BlogPostsService {
  constructor(
    @InjectModel(collectionName) private model: Model<BlogPostsDocument>,
  ) {}

  public async NewPost(post: BlogPostsDocument) {
    const doc = new this.model(post);
    const { _id } = await doc.save();
    return _id.toString();
  }

  public async DeletePost(id: string) {
    const response = await this.model.deleteOne({ _id: id }).exec();
    return response.deletedCount;
  }

  public async GetAllPosts() {
    const response = await this.model
      .find(
        {},
        {
          _id: 1,
          title: 1,
          image: 1,
          summery: 1,
        },
      )
      .exec();
    return response;
  }

  public async GetSinglePost(id: string) {
    const response = await this.model
      .findOne(
        { _id: id },
        {
          __v: 0,
        },
      )
      .exec();
    if (!response) throw new NotFoundException();
    return response as BlogPostsDocument;
  }

  public async UpdatePost(id: string, updatedValue: UpdatePostDto) {
    const response = await this.model
      .updateOne({ _id: id }, { $set: updatedValue })
      .exec();
    if (!response.matchedCount) throw new NotFoundException();
    return response;
  }
}
