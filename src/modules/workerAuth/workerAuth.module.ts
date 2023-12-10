import { Module } from '@nestjs/common';
import { WorkerAuthService } from './workerAuth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerAuth } from './workerAuth.model';

@Module({
  providers: [WorkerAuthService],
  imports: [SequelizeModule.forFeature([WorkerAuth])],
  exports: [WorkerAuthService],
})
export class WorkerAuthModule {}
