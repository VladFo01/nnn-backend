import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stats } from './stats.model';
import { StatsSercice } from './stats.service';

@Module({
  imports: [SequelizeModule.forFeature([Stats])],
  providers: [StatsSercice],
  exports: [StatsSercice],
})
export class StatsModule {}
