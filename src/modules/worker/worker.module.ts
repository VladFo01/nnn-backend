import { Module, forwardRef } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerAuth } from '../workerAuth/workerAuth.model';
import { WorkerRole } from '../workerRole/workerRole.model';
import { WorkerController } from './worker.controller';
import { WorkerAuthModule } from '../workerAuth/workerAuth.module';
import { Worker } from './worker.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [WorkerController],
  providers: [WorkerService],
  imports: [
    SequelizeModule.forFeature([Worker, WorkerAuth, WorkerRole]),
    WorkerAuthModule,
    forwardRef(() => AuthModule),
  ],
  exports: [WorkerService],
})
export class WorkerModule {}
