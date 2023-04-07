import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Layout {
  @Prop({
    unique: true,
    required: true,
    type: String,
  })
  layoutId: string;

  @Prop({
    required: true,
    type: String,
  })
  displayName: string;

  @Prop({
    required: true,
    type: [Object],
  })
  data: Record<string, any>[];

  @Prop({
    type: Object,
  })
  metaData: Record<string, any>;

  @Prop({
    type: Date,
    default: Date.now,
  })
  creationDate: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  lastModifiedDate: Date;
}

export type LayoutsDocument = Layout & Document;
export const LayoutSchema = SchemaFactory.createForClass(Layout);
export const collectionName = 'col_layouts';
