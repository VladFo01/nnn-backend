import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stats } from './stats.model';
import { WhereOptions, Op, fn, col } from 'sequelize';

@Injectable()
export class StatsSercice {
  constructor(@InjectModel(Stats) private statsModel: typeof Stats) {}

  async findAll(dateFrom: string, dateTo: string) {
    const where: WhereOptions<Stats> = {};

    if (dateFrom && dateTo) {
      where.day = {
        [Op.gte]: dateFrom,
        [Op.lte]: dateTo,
      };
    } else if (dateFrom) {
      where.day = {
        [Op.gte]: dateFrom,
      };
    } else if (dateTo) {
      where.day = {
        [Op.lte]: dateTo,
      };
    }

    return this.statsModel.findAll({
      where,
      attributes: [[fn('SUM', col('income')), 'totalIncome']],
    });
  }
}
