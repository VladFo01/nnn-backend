import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [OrderController],
  imports: [AuthModule],
})
export class OrderModule {}
