import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  imports: [AuthModule],
  providers: [OrderService],
})
export class OrderModule {}
