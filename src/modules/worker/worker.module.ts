import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerAuth } from '../workerAuth/workerAuth.model';
import { WorkerRole } from '../workerRole/workerRole.model';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';

@Module({
  providers: [WorkerService],
  imports: [
    SequelizeModule.forFeature([WorkerAuth, WorkerRole]),
    WorkerAuthService,
  ],
})
export class WorkerModule {}
