import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class SiteData {
  @Prop({
    type: String,
    unique: true,
  })
  sectionId: string;

  @Prop({
    type: String,
    required: true,
  })
  pageUrl: string;

  @Prop({
    type: String,
    required: false,
  })
  icon: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  content: string;
}

export const collectionName = 'col_site_data';
export const SiteDataSchema = SchemaFactory.createForClass(SiteData);
export type SiteDataDocument = SiteData & Document;
