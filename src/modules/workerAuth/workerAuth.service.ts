import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkerAuth } from './workerAuth.model';
import {
  CreateWorkerAuthDto,
  DeleteWorkerAuthDto,
  UpdateWorkerAuthDto,
} from './dto/workerAuth.dto';
import { Transaction } from 'sequelize';

@Injectable()
export class WorkerAuthService {
  constructor(
    @InjectModel(WorkerAuth) private workerAuthRepository: typeof WorkerAuth,
  ) {}

  async createWorkerAuth(dto: CreateWorkerAuthDto) {
    return this.workerAuthRepository.create(dto);
  }

  async getWorkerAuthByWorkerId(workerId: number) {
    return this.workerAuthRepository.findOne({
      where: {
        worker_id: workerId,
        deleted_at: null,
      },
    });
  }

  async update(dto: UpdateWorkerAuthDto, transaction?: Transaction) {
    return this.workerAuthRepository.update(
      {
        email: dto.email,
        password: dto.password,
      },
      {
        where: { worker_id: dto.worker_id, deleted_at: null },
        transaction,
      },
    );
  }

  async smartDelete(dto: DeleteWorkerAuthDto, transaction?: Transaction) {
    return this.workerAuthRepository.update(
      {
        deleted_at: new Date(),
      },
      {
        where: { worker_id: dto.worker_id, deleted_at: null },
        transaction,
      },
    );
  }
}
