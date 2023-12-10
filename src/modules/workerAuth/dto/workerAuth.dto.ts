export class CreateWorkerAuthDto {
  readonly email: string;
  readonly password: string;
  readonly worker_id: number;
}

export class UpdateWorkerAuthDto extends CreateWorkerAuthDto {}

export class DeleteWorkerAuthDto {
  readonly worker_id: number;
}
