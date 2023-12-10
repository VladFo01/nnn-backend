import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MongooseModuleOptions } from '@nestjs/mongoose';

interface NodeConfig {
  port: string;
}

interface MongoConfig {
  uri: string;
  options: MongooseModuleOptions;
}

export default interface ConfigDTO {
  node: NodeConfig;
  postgres: TypeOrmModuleOptions;
  mongo: MongoConfig;
}
