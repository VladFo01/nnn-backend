import {
  Column,
  DataType,
  Model,
  Table,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { Worker } from '../worker/worker.model';

@Table({ tableName: 'worker_role', createdAt: false, updatedAt: false })
export class WorkerRole extends Model<WorkerRole> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @HasMany(() => Worker)
  workers: Worker[];
}
