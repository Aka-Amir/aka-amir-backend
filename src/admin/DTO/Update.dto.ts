import { IsNotEmpty } from 'class-validator';
import { UpdateType } from '../types/UpdateType';

export class UpdateAdminDto {
  @IsNotEmpty({
    message: 'id_is_empty',
  })
  id: string;

  updateFields: UpdateType;
}
