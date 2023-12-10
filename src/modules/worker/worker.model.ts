import {
  Column,
  DataType,
  Model,
  Table,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { WorkerRole } from '../workerRole/workerRole.model';
import { WorkerAuth } from '../workerAuth/workerAuth.model';

interface WorkerCreationAttr {
  first_name: string;
  last_name: string;
  role_id: number;
}

@Table({ tableName: 'worker', createdAt: false, updatedAt: false })
export class Worker extends Model<Worker, WorkerCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ForeignKey(() => WorkerRole)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('now'),
  })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @BelongsTo(() => WorkerRole)
  role: WorkerRole;

  @HasOne(() => WorkerAuth)
  workerAuth: WorkerAuth;
}
