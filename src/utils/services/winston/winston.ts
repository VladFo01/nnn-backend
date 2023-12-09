import { utilities } from 'nest-winston';
import { format, LoggerOptions, transports } from 'winston';
import { WinstonConfigDTO } from './winston.dto';

export const winstonConfig = (): WinstonConfigDTO => {
  const transportsConfig: LoggerOptions['transports'] = [
    new transports.Console(),
    new transports.File({
      filename: `payment-service.log`,
      dirname: 'logs',
      level: 'error',
    }),
  ];

  const formatConfig: LoggerOptions['format'] = format.combine(
    format.timestamp(),
    utilities.format.nestLike(),
  );

  return {
    format: formatConfig,
    transports: transportsConfig,
  };
};
