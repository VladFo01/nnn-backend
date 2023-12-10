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

interface WorkerAuthCreationAttr {
  email: string;
  password: string;
  worker_id: number;
}

@Table({ tableName: 'worker_auth', createdAt: false, updatedAt: false })
export class WorkerAuth extends Model<WorkerAuth, WorkerAuthCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  token: string;

  @ForeignKey(() => Worker)
  @Column({ type: DataType.INTEGER, allowNull: false })
  worker_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @BelongsTo(() => Worker)
  worker: Worker;
}
