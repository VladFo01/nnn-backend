import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { MongooseModuleOptions } from '@nestjs/mongoose';

interface NodeConfig {
  port: string;
  jwtSecretKey: string;
  rustServiceUrl: string;
}

interface MongoConfig {
  uri: string;
  options: MongooseModuleOptions;
}

export default interface ConfigDTO {
  node: NodeConfig;
  postgres: SequelizeModuleOptions;
  mongo: MongoConfig;
}
