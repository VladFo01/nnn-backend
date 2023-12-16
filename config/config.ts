import * as dotenv from 'dotenv';
import ConfigDTO from './config.dto';

dotenv.config({ path: `env/.${process.env.NODE_ENV}.env` });

const getConfig: () => ConfigDTO = () => ({
  node: {
    port: process.env.PORT,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    rustServiceUrl: process.env.RUST_SERVICE_URL,
  },
  postgres: {
    dialect: 'postgres',
    uri: process.env.POSTGRES_URL,
    define: {
      timestamps: false,
    },
    logging: false,
  },
  mongo: {
    uri: process.env.MONGO_URL,
    options: {},
  },
});

export default getConfig;
