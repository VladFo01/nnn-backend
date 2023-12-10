import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Worker } from 'src/modules/worker/worker.model';

export const WorkerObject = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Worker => {
    const req = ctx.switchToHttp().getRequest();
    return req.worker;
  },
);
