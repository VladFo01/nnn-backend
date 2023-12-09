import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const { url, method, body, headers } = request;

    const message = `Incoming request ${method} - ${url}`;

    this.logger.log({
      level: 'info',
      message,
      body,
      headers,
    });

    return next.handle().pipe(
      tap({
        next: (val: unknown): void => {
          this.logResponse(val, context);
        },
        error: (err: Error): void => {
          this.logError(err, context);
        },
      }),
    );
  }

  private logResponse(body: any, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const { url, method } = request;
    const { statusCode } = response;

    const message = `Outgoing response - ${statusCode} - ${method} - ${url}`;

    this.logger.log({
      level: 'info',
      message,
      body: body ? JSON.stringify(body, null, 2) : '{}',
    });
  }

  private logError(error: Error, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const { url, method, body } = request;

    if (error instanceof HttpException) {
      const statusCode = error.getStatus();
      const message = `Outgoing request - ${statusCode} - ${method} - ${url}`;

      this.logger.log({
        level: 'error',
        message,
        method,
        url,
        body,
        error,
      });
    } else {
      this.logger.log({
        level: 'error',
        message: `Outgoing response - ${method} - ${url}`,
        error: error.stack,
      });
    }
  }
}
