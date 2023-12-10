export class CreateWorkerDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly roleId: number;
}

export class UpdateWorkerDto {
  readonly id: number;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly roleId?: number;
  readonly email?: string;
  readonly password?: string;
}

export class DeleteWorkerDto {
  readonly id: number;
}
