import { Module } from '@nestjs/common';
import { WorkerRoleService } from './workerRole.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkerRole } from './workerRole.model';

@Module({
  providers: [WorkerRoleService],
  imports: [SequelizeModule.forFeature([WorkerRole])],
})
export class WorkerRoleModule {}
