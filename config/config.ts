import { ConfigDTO } from './config.dto';
import * as dotenv from 'dotenv';

dotenv.config({ path: `env/.${process.env.NODE_ENV}.env` });

export const config: ConfigDTO = {
  db: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    migrationsRun: JSON.parse(process.env.RUN_MIGRATIONS),
    synchronize: true,
  },
};
