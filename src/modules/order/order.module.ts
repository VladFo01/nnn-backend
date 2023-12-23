import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { AuthModule } from '../auth/auth.module';
import { OrderService } from './order.service';
import { StatsModule } from '../stats/stats.module';

@Module({
  controllers: [OrderController],
  imports: [AuthModule, StatsModule],
  providers: [OrderService],
})
export class OrderModule {}
