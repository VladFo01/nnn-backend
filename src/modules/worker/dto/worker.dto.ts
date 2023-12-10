import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkerDto {
  @ApiProperty({ example: 'Nikodim' })
  readonly firstName: string;

  @ApiProperty({ example: 'Vlasenko' })
  readonly lastName: string;

  @ApiProperty({ example: 'luka@lll.kpi.ua' })
  readonly email: string;

  @ApiProperty({ example: '12345' })
  readonly password: string;

  @ApiProperty({ example: 3 })
  readonly roleId: number;
}

export class UpdateWorkerDto {
  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({ example: 'Nikodim' })
  readonly first_name?: string;

  @ApiProperty({ example: 'Vlasenko' })
  readonly last_name?: string;

  @ApiProperty({ example: 3 })
  readonly roleId?: number;

  @ApiProperty({ example: 'luka@lll.kpi.ua' })
  readonly email?: string;

  @ApiProperty({ example: '12345' })
  readonly password?: string;
}

export class DeleteWorkerDto {
  @ApiProperty({ example: 3 })
  readonly id: number;
}
