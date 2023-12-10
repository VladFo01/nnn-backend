import {
  Column,
  DataType,
  Model,
  Table,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { Worker } from '../worker/worker.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'worker_role', createdAt: false, updatedAt: false })
export class WorkerRole extends Model<WorkerRole> {
  @ApiProperty({ example: 3 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Admin' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: '2023-12-10T11:46:05.416Z' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  created_at: Date;

  @ApiProperty({ example: '2023-12-10T11:46:05.416Z' })
  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @HasMany(() => Worker)
  workers: Worker[];
}
