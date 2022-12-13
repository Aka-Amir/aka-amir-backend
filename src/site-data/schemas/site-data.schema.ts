import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TileData } from './tile.data';

@Schema()
export class SiteData {
  @Prop({
    type: Number,
  })
  sectionIndex: number;

  @Prop({
    type: String,
    required: true,
  })
  pageId: string;

  @Prop({
    type: String,
    required: false,
  })
  icon?: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
  })
  html?: string;

  @Prop({
    type: Array<TileData>,
    required: false,
  })
  tiles?: Array<TileData>;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export const collectionName = 'col_site_data';
export const SiteDataSchema = SchemaFactory.createForClass(SiteData);
export type SiteDataDocument = SiteData & Document;
