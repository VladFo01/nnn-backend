import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WorkerService } from '../worker/worker.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private workerService: WorkerService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader: string = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('Unauthorized');
      }

      this.jwtService.verify(token, {
        secret: this.configService.get('node.jwtSecretKey'),
      });

      const worker = await this.workerService.getWorkerWithAuthWhere(
        {
          deleted_at: null,
        },
        {
          token,
          deleted_at: null,
        },
      );

      if (!worker) {
        throw new UnauthorizedException('Unauthorized');
      }

      req.worker = worker;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
