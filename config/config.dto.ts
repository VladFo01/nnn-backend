import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class ConfigDTO {
  db: TypeOrmModuleOptions;
}
