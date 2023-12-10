import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { CreateWorkerDto, UpdateWorkerDto } from './dto/worker.dto';

@Controller('workers')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  @Post()
  async create(@Body() workerDto: CreateWorkerDto) {
    return this.workerService.createWorker(workerDto);
  }

  @Get()
  async getAll() {
    return this.workerService.getAll();
  }

  @Get(':workerId')
  async getOne(@Param('workerId') workerId: number) {
    const worker = await this.workerService.getWorkerWithAuthById(workerId);

    if (!worker) {
      throw new NotFoundException(`Worker with id ${workerId} not found`);
    }
    return worker;
  }

  @Put()
  async update(@Body() updateDto: UpdateWorkerDto) {
    return this.workerService.update(updateDto);
  }

  @Delete(':workerId')
  async delete(@Param('workerId') workerId: number) {
    return this.workerService.smartDelete({ id: workerId });
  }
}
