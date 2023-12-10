import { Module } from '@nestjs/common';
import { WorkerAuthService } from './workerAuth.service';

@Module({
  providers: [WorkerAuthService],
  exports: [WorkerAuthService],
})
export class WorkerAuthModule {}
