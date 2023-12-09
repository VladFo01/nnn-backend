import { Catch, Inject, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, throwError } from 'rxjs';
import { Logger } from 'winston';

@Catch()
export class AllRcpExceptionsFilter
  implements RpcExceptionFilter<RpcException>
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: RpcException): Observable<any> {
    return throwError(() => {
      this.logger.log({
        level: 'error',
        message: exception.message,
      });
      return exception.getError();
    });
  }
}
