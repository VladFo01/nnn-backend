import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'stats' })
export class Stats extends Model<Stats> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  day: Date;

  @Column
  income: number;
}
