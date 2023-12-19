import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto, LogoutDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { WorkerService } from '../worker/worker.service';
import { Worker } from '../worker/worker.model';
import { JwtService } from '@nestjs/jwt';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';

@Injectable()
export class AuthService {
  constructor(
    private workerService: WorkerService,
    private workerAuthService: WorkerAuthService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const worker = await this.workerService.getWorkerWithAuthWhere(
      {
        deleted_at: null,
      },
      {
        email: dto.email.toLowerCase(),
        deleted_at: null,
      },
    );

    if (!worker) {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordEquels = await bcrypt.compare(
      dto.password,
      worker.workerAuth.password,
    );

    if (!passwordEquels) {
      throw new BadRequestException('Invalid credentials');
    }

    const { token } = this.generateToken(worker);

    await this.workerAuthService.update({
      worker_id: worker.id,
      token,
    });

    const updatedWorker = await this.workerService.getWorkerWithAuthById(
      worker.id,
    );

    return {
      worker: updatedWorker,
      token,
    };
  }

  private generateToken(worker: Worker) {
    const payload = {
      id: worker.id,
      email: worker.workerAuth.email,
      role: worker.role_id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async logout(dto: LogoutDto) {
    await this.workerAuthService.update({
      worker_id: dto.workerId,
      token: null,
    });
  }
}
