import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Admins {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  username: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  dateRegistered: Date;
  @Prop({
    type: Number,
    default: 0,
  })
  avatarId: number;
}

export type AdminsDocument = Admins & Document;
export const AdminsSchema = SchemaFactory.createForClass(Admins);
export const collectionName = 'col_admins';
