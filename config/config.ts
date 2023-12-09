import * as dotenv from 'dotenv';
import ConfigDTO from './config.dto';

dotenv.config({ path: `env/.${process.env.NODE_ENV}.env` });

const getConfig: () => ConfigDTO = () => ({
  node: {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
  },
  postgres: {
    type: 'postgres',
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    url: process.env.POSTGRES_URL,
  },
});

export default getConfig;
