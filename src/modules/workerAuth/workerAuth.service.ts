import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkerAuth } from './workerAuth.model';
import {
  CreateWorkerAuthDto,
  DeleteWorkerAuthDto,
  UpdateWorkerAuthDto,
} from './dto/workerAuth.dto';
import { Transaction, WhereOptions } from 'sequelize';

@Injectable()
export class WorkerAuthService {
  constructor(
    @InjectModel(WorkerAuth) private workerAuthRepository: typeof WorkerAuth,
  ) {}

  async createWorkerAuth(dto: CreateWorkerAuthDto, transaction?: Transaction) {
    return this.workerAuthRepository.create(dto, { transaction });
  }

  async getWorkerAuthByWorkerId(workerId: number) {
    return this.workerAuthRepository.findOne({
      where: {
        worker_id: workerId,
        deleted_at: null,
      },
    });
  }

  async getWorkerAuthWhere(where: WhereOptions<WorkerAuth>) {
    return this.workerAuthRepository.findOne({
      where,
    });
  }

  async update(dto: UpdateWorkerAuthDto, transaction?: Transaction) {
    return this.workerAuthRepository.update(
      {
        email: dto.email,
        password: dto.password,
        token: dto.token,
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
