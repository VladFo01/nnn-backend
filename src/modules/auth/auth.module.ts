import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import config from '../../../config/config';
import { TOKEN_EXPIRING_HOURS } from '../../utils/constants';
import { WorkerModule } from '../worker/worker.module';
import { WorkerAuthModule } from '../workerAuth/workerAuth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';

const jwtConfig: JwtModuleOptions = {
  secret: config().node.jwtSecretKey,
  signOptions: {
    expiresIn: `${TOKEN_EXPIRING_HOURS}h`,
  },
};

@Module({
  providers: [AuthService, AuthGuard, RolesGuard],
  controllers: [AuthController],
  imports: [
    forwardRef(() => WorkerModule),
    WorkerAuthModule,
    JwtModule.register(jwtConfig),
    ConfigModule,
  ],
  exports: [JwtModule, AuthGuard, RolesGuard, WorkerModule],
})
export class AuthModule {}
