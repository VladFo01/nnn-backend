import { SequelizeModuleOptions } from '@nestjs/sequelize';

interface NodeConfig {
  port: string;
}

export default interface ConfigDTO {
  node: NodeConfig;
  postgres: SequelizeModuleOptions;
}
