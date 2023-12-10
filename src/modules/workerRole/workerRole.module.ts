import { Module } from '@nestjs/common';
import { WorkerRoleService } from './workerRole.service';

@Module({
  providers: [WorkerRoleService],
})
export class WorkerRoleModule {}
