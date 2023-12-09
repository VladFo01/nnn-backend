import { LoggerOptions } from 'winston';

export class WinstonConfigDTO {
  format: LoggerOptions['format'];
  transports: LoggerOptions['transports'];
}
