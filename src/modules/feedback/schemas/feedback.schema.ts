import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type FeedbackDocument = Feedback & Document;

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
