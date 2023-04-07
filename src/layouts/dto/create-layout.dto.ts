import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Layout } from '../entities/layout.entity';

export class CreateLayoutDto extends OmitType(Layout, [
  'layoutId',
  'creationDate',
  'lastModifiedDate',
]) {
  @IsNotEmpty({
    message: 'layoutId_is_empty',
  })
  layoutId: string;
}
