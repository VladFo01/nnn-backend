import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback {
  @ApiProperty({ example: '+123445' })
  @Prop()
  phoneNumber: string;

  @ApiProperty({ example: 'Blablabla' })
  @Prop()
  text: string;

  @ApiProperty({ example: 5 })
  @Prop()
  rating: number;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
