import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { WorkerObject } from '../../decorators/worker.decorator';
import { Worker } from '../worker/worker.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200 })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Logout' })
  @ApiResponse({ status: 200 })
  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@WorkerObject() worker: Worker) {
    return this.authService.logout({ workerId: worker.id });
  }
}
