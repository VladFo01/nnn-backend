import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './utils/filters/all-exceptions.filter';
import { LoggingInterceptor } from './utils/interceptors/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './utils/services/winston/winston';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import config from '../config/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const defaultConfig: TypeOrmModuleOptions = {
  ...config().postgres,
  synchronize: true,
  // models
  entities: [],
};

const mongoUri: string = config().mongo.uri;
const mongoOptions: MongooseModuleOptions = config().mongo.options;

@Module({
  imports: [
    FeedbackModule,
    AuthModule,
    WinstonModule.forRoot(winstonConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    TypeOrmModule.forRoot(defaultConfig),
    MongooseModule.forRoot(mongoUri, mongoOptions),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
