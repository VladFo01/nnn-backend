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
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';

import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

import config from '../config/config';

// models
import { Worker } from './modules/worker/worker.model';
import { WorkerAuth } from './modules/workerAuth/workerAuth.model';
import { WorkerRole } from './modules/workerRole/workerRole.model';
import { WorkerModule } from './modules/worker/worker.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrderModule } from './modules/order/order.module';
import { Stats } from './modules/stats/stats.model';

const defaultConfig: SequelizeModuleOptions = {
  ...config().postgres,
  synchronize: true,
  autoLoadModels: true,
  // models
  models: [Worker, WorkerAuth, WorkerRole, Stats],
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
    SequelizeModule.forRoot(defaultConfig),
    WorkerModule,
    MenuModule,
    OrderModule,
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
