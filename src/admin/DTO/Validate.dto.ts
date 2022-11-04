import { IsNotEmpty } from 'class-validator';

export class VlidateDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
