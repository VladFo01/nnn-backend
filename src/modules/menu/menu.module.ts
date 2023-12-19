import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [MenuController],
  imports: [AuthModule],
})
export class MenuModule {}
