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
import { ApiProperty } from '@nestjs/swagger';

interface WorkerCreationAttr {
  first_name: string;
  last_name: string;
  role_id: number;
}

@Table({ tableName: 'worker', createdAt: false, updatedAt: false })
export class Worker extends Model<Worker, WorkerCreationAttr> {
  @ApiProperty({ example: 10 })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Nikodim' })
  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'Shevchenko' })
  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @ApiProperty({ example: 4 })
  @ForeignKey(() => WorkerRole)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

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

  @BelongsTo(() => WorkerRole)
  role: WorkerRole;

  @HasOne(() => WorkerAuth)
  workerAuth: WorkerAuth;
}
