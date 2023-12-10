import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'luka@lll.kpi.ua' })
  readonly email: string;

  @ApiProperty({ example: 'luka@lll.kpi.ua' })
  readonly password: string;
}

export class LogoutDto {
  readonly workerId: number;
}
