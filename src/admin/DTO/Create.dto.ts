import { IsNotEmpty } from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty({
    message: 'username_is_empty',
  })
  username: string;

  @IsNotEmpty({
    message: 'username_is_empty',
  })
  password: string;
}
