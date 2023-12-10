import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerAuth } from '../workerAuth/workerAuth.model';
import { WorkerRole } from '../workerRole/workerRole.model';
import { WorkerController } from './worker.controller';
import { WorkerAuthModule } from '../workerAuth/workerAuth.module';
import { Worker } from './worker.model';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
  imports: [
    SequelizeModule.forFeature([Worker, WorkerAuth, WorkerRole]),
    WorkerAuthModule,
  ],
})
export class WorkerModule {}
