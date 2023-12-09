import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface NodeConfig {
  port: string;
}

export default interface ConfigDTO {
  node: NodeConfig;
  postgres: TypeOrmModuleOptions;
}
