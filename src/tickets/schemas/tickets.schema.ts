import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tickets {
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  problem: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  date: Date;
}

export type TicketsDocument = Tickets & Document;
export const TicketsSchema = SchemaFactory.createForClass(Tickets);
export const collectionName = 'col_tickets';
