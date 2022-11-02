import { IsNotEmpty } from 'class-validator';

export class OpenTicketDto {
  @IsNotEmpty({
    message: 'email_is_empty',
  })
  email: string;
  @IsNotEmpty({
    message: 'problem_is_empty',
  })
  problem: string;
}
