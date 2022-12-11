import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { BlogPostsService } from './blog-posts.service';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { BlogPostsDocument } from './schema/blog-post.schema';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private _srv: BlogPostsService) {}

  @Post('new')
  @UseGuards(AuthGuard)
  public async CreateNewPost(@Body() body: CreatePostDto) {
    const id = await this._srv.NewPost(body as BlogPostsDocument);
    return {
      postID: id,
    };
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  public async DeleteById(@Param('id') id: string) {
    const response = await this._srv.DeletePost(id);
    if (!response) throw new NotFoundException();
    return {
      message: 'deleted',
    };
  }

  @Get(':arg')
  public async GetPost(@Param('arg') arg: string) {
    const response =
      arg === 'all' || !arg
        ? await this._srv.GetAllPosts()
        : await this._srv.GetSinglePost(arg);
    return response;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  public async UpdatePost(
    @Param('id') id: string,
    @Body() updateData: UpdatePostDto,
  ) {
    const response = await this._srv.UpdatePost(id, updateData);
    if (response.modifiedCount)
      return {
        message: 'updated',
      };
    return {
      message: 'no change',
    };
  }
}
