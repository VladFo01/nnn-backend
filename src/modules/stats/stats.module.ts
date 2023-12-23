import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stats } from './stats.model';
import { StatsService } from './stats.service';

@Module({
  imports: [SequelizeModule.forFeature([Stats])],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
