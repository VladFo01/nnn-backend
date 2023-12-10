import {
  Column,
  DataType,
  Model,
  Table,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Worker } from '../worker/worker.model';
import { ApiProperty } from '@nestjs/swagger';

interface WorkerAuthCreationAttr {
  email: string;
  password: string;
  worker_id: number;
}

@Table({ tableName: 'worker_auth', createdAt: false, updatedAt: false })
export class WorkerAuth extends Model<WorkerAuth, WorkerAuthCreationAttr> {
  @ApiProperty({ example: 3 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'example@gmail.com' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345' })
  @Column({ type: DataType.TEXT, allowNull: false })
  password: string;

  @ApiProperty({ example: 'tokenblablasdfsfsdffds' })
  @Column({ type: DataType.TEXT, allowNull: true })
  token: string;

  @ApiProperty({ example: 6 })
  @ForeignKey(() => Worker)
  @Column({ type: DataType.INTEGER, allowNull: false })
  worker_id: number;

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

  @BelongsTo(() => Worker)
  worker: Worker;
}
