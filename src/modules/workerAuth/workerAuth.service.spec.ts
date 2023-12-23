import { Test, TestingModule } from '@nestjs/testing';
import { WorkerAuthService } from './workerAuth.service';
import { WorkerAuth } from './workerAuth.model';
import {
  CreateWorkerAuthDto,
  UpdateWorkerAuthDto,
  DeleteWorkerAuthDto,
} from './dto/workerAuth.dto';
import { getModelToken } from '@nestjs/sequelize';

describe('WorkerAuthService', () => {
  let service: WorkerAuthService;
  let workerAuthModel: typeof WorkerAuth;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkerAuthService,
        {
          provide: getModelToken(WorkerAuth),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WorkerAuthService>(WorkerAuthService);
    workerAuthModel = module.get<typeof WorkerAuth>(getModelToken(WorkerAuth));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createWorkerAuth', () => {
    it('should create a worker authentication record', async () => {
      const createDto: CreateWorkerAuthDto = {
        email: 'test@example.com',
        password: 'password123',
        worker_id: 1,
      };

      const mockCreate = jest
        .spyOn(workerAuthModel, 'create')
        .mockResolvedValue(createDto as any);

      const result = await service.createWorkerAuth(createDto);

      expect(result).toBeDefined();
      expect(mockCreate).toHaveBeenCalledWith(createDto, {
        transaction: undefined,
      });
    });
  });

  describe('getWorkerAuthByWorkerId', () => {
    it('should retrieve a worker authentication record by worker ID', async () => {
      const workerId = 1;
      const mockFindOne = jest
        .spyOn(workerAuthModel, 'findOne')
        .mockResolvedValue({} as any);

      const result = await service.getWorkerAuthByWorkerId(workerId);

      expect(result).toBeDefined();
      expect(mockFindOne).toHaveBeenCalledWith({
        where: {
          worker_id: workerId,
          deleted_at: null,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a worker authentication record', async () => {
      const updateDto: UpdateWorkerAuthDto = {
        worker_id: 1,
        email: 'updated@example.com',
        password: 'updatedPassword123',
        token: 'updatedToken',
      };

      const mockUpdate = jest
        .spyOn(workerAuthModel, 'update')
        .mockResolvedValue([1] as any);

      const result = await service.update(updateDto);

      expect(result).toBeDefined();
      expect(mockUpdate).toHaveBeenCalledWith(
        {
          email: updateDto.email,
          password: updateDto.password,
          token: updateDto.token,
        },
        {
          where: { worker_id: updateDto.worker_id, deleted_at: null },
          transaction: undefined,
        },
      );
    });
  });

  describe('smartDelete', () => {
    it('should soft delete a worker authentication record', async () => {
      const deleteDto: DeleteWorkerAuthDto = {
        worker_id: 1,
      };

      const mockUpdate = jest
        .spyOn(workerAuthModel, 'update')
        .mockResolvedValue([1] as any);

      const result = await service.smartDelete(deleteDto);

      expect(result).toBeDefined();
      expect(mockUpdate).toHaveBeenCalledWith(
        {
          deleted_at: expect.any(Date),
        },
        {
          where: { worker_id: deleteDto.worker_id, deleted_at: null },
          transaction: undefined,
        },
      );
    });
  });
});
