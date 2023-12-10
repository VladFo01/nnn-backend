import { Injectable } from '@nestjs/common';
import { Worker } from './worker.model';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateWorkerDto,
  DeleteWorkerDto,
  UpdateWorkerDto,
} from './dto/worker.dto';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { WhereOptions } from 'sequelize';
import { WorkerAuth } from '../workerAuth/workerAuth.model';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private workerRepository: typeof Worker,
    private workerAuthService: WorkerAuthService,
    private sequelize: Sequelize,
  ) {}

  async createWorker(dto: CreateWorkerDto) {
    const t = await this.sequelize.transaction();

    try {
      const worker = await this.workerRepository.create({
        first_name: dto.firstName,
        last_name: dto.lastName,
        role_id: dto.roleId,
      });

      const hashedPassword = await bcrypt.hash(dto.password, 5);

      await this.workerAuthService.createWorkerAuth({
        worker_id: worker.id,
        email: dto.email.toLowerCase(),
        password: hashedPassword,
      });

      const workerWithAuth = await this.getWorkerWithAuthById(worker.id);

      await t.commit();
      return workerWithAuth;
    } catch (err) {
      await t.rollback();
      throw err;
    }
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
          required: true,
          where: { deleted_at: null },
          attributes: ['email', 'password', 'token'],
        },
        {
          association: 'role',
          required: true,
          where: { deleted_at: null },
          attributes: ['title'],
        },
      ],
    });
  }

  async getWorkerWithAuthWhere(
    workerWhere: WhereOptions<Worker>,
    workerAuthWhere: WhereOptions<WorkerAuth>,
  ) {
    return this.workerRepository.findOne({
      where: workerWhere,
      include: [
        {
          association: 'workerAuth',
          required: true,
          where: workerAuthWhere,
          attributes: ['email', 'password', 'token'],
        },
        {
          association: 'role',
          required: true,
          where: { deleted_at: null },
          attributes: ['title'],
        },
      ],
    });
  }

  async getAll() {
    return this.workerRepository.findAll({
      where: { deleted_at: null },
    });
  }

  async update(dto: UpdateWorkerDto) {
    const t = await this.sequelize.transaction();

    try {
      const worker = await this.workerRepository.update(
        {
          first_name: dto.first_name,
          last_name: dto.last_name,
          role_id: dto.roleId,
        },
        {
          where: { id: dto.id, deleted_at: null },
          returning: true,
          transaction: t,
        },
      );

      await this.workerAuthService.update(
        {
          worker_id: worker[1][0].id,
          email: dto.email,
          password: dto.password,
        },
        t,
      );

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }

  async smartDelete(dto: DeleteWorkerDto) {
    const t = await this.sequelize.transaction();

    try {
      const worker = await this.workerRepository.update(
        {
          deleted_at: new Date(),
        },
        {
          where: { id: dto.id, deleted_at: null },
          returning: true,
          transaction: t,
        },
      );

      await this.workerAuthService.smartDelete(
        {
          worker_id: worker[1][0].id,
        },
        t,
      );

      await t.commit();
    } catch (err) {
      await t.rollback();
      throw err;
    }
  }
}
