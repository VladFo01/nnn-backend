import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkerAuth } from './workerAuth.model';
import { CreateWorkerAuthDto } from './dto/create-workerAuth.dto';

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
}
