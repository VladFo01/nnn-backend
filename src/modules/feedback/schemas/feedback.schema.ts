import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback {
  @Prop()
  phoneNumber: string;

  @Prop()
  text: string;

  @Prop()
  rating: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
