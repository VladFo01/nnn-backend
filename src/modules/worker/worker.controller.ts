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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Worker } from './worker.model';

@ApiTags('Workers')
@Controller('workers')
export class WorkerController {
  constructor(private workerService: WorkerService) {}

  @ApiOperation({ summary: 'Create worker' })
  @ApiResponse({ status: 200, type: Worker })
  @Post()
  async create(@Body() workerDto: CreateWorkerDto) {
    return this.workerService.createWorker(workerDto);
  }

  @ApiOperation({ summary: 'Get all workers' })
  @ApiResponse({ status: 200, type: [Worker] })
  @Get()
  async getAll() {
    return this.workerService.getAll();
  }

  @ApiOperation({ summary: 'Get worker by id' })
  @ApiResponse({ status: 200, type: Worker })
  @Get(':workerId')
  async getOne(@Param('workerId') workerId: number) {
    const worker = await this.workerService.getWorkerWithAuthById(workerId);

    if (!worker) {
      throw new NotFoundException(`Worker with id ${workerId} not found`);
    }
    return worker;
  }

  @ApiOperation({ summary: 'Update worker' })
  @ApiResponse({ status: 200 })
  @Put()
  async update(@Body() updateDto: UpdateWorkerDto) {
    return this.workerService.update(updateDto);
  }

  @ApiOperation({ summary: 'Delete worker' })
  @ApiResponse({ status: 200 })
  @Delete(':workerId')
  async delete(@Param('workerId') workerId: number) {
    return this.workerService.smartDelete({ id: workerId });
  }
}
