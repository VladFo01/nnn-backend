import { Injectable } from '@nestjs/common';
import { Worker } from './worker.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private workerRepository: typeof Worker,
    private workerAuthService: WorkerAuthService,
  ) {}

  async createWorker(dto: CreateWorkerDto) {
    const worker = await this.workerRepository.create({
      first_name: dto.firstName,
      last_name: dto.lastName,
      role_id: dto.roleId,
    });

    await this.workerAuthService.createWorkerAuth({
      worker_id: worker.id,
      email: dto.email,
      password: dto.password,
    });

    const workerWithAuth = await this.getWorkerWithAuthById(worker.id);

    return workerWithAuth;
  }

  async getWorkerWithAuthById(workerId: number) {
    return this.workerRepository.findOne({
      where: {
        id: workerId,
        deleted_at: null,
      },
      include: [
        {
          association: 'workerAuth',
          required: false,
          where: { deleted_at: null },
        },
      ],
    });
  }
}
