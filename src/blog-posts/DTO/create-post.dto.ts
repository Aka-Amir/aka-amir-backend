import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  content?: string[];
  html?: string;
  image?: string;
  summery?: string;
  @IsNotEmpty({
    message: 'title_empty',
  })
  title: string;
}
