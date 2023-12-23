import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {
  @ApiProperty({ example: '+123445' })
  readonly phoneNumber: string;

  @ApiProperty({ example: 'Blablabla' })
  readonly text: string;

  @ApiProperty({ example: 5 })
  readonly rating: number;

  readonly _id?: string;
}
