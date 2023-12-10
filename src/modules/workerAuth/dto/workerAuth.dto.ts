export class CreateWorkerAuthDto {
  readonly email: string;
  readonly password: string;
  readonly worker_id: number;
}

export class UpdateWorkerAuthDto {
  readonly worker_id: number;
  readonly email?: string;
  readonly password?: string;
  readonly token?: string;
}

export class DeleteWorkerAuthDto {
  readonly worker_id: number;
}
