import { Test, TestingModule } from '@nestjs/testing';
import { WorkerService } from './worker.service';
import { Worker } from './worker.model';
import { Sequelize } from 'sequelize-typescript';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';
import {
  CreateWorkerDto,
  DeleteWorkerDto,
  UpdateWorkerDto,
} from './dto/worker.dto';
import { getModelToken } from '@nestjs/sequelize';
import { WorkerAuth } from '../workerAuth/workerAuth.model';

describe('WorkerService', () => {
  let service: WorkerService;
  let workerAuthService: WorkerAuthService;
  const mockTransaction = { commit: jest.fn(), rollback: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkerService,
        WorkerAuthService,
        {
          provide: getModelToken(Worker),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: getModelToken(WorkerAuth),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: Sequelize,
          useValue: {
            transaction: jest.fn(() => mockTransaction),
          },
        },
      ],
    }).compile();

    service = module.get<WorkerService>(WorkerService);
    workerAuthService = module.get<WorkerAuthService>(WorkerAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createWorker', () => {
    it('should create a worker with authentication', async () => {
      const createDto: CreateWorkerDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        roleId: 1,
      };

      const createWorkerMock = jest
        .spyOn(service['workerRepository'], 'create')
        .mockResolvedValueOnce({
          id: 1,
          ...createDto,
        });

      const createWorkerAuthMock = jest
        .spyOn(workerAuthService, 'createWorkerAuth')
        .mockResolvedValueOnce({
          email: createDto.email,
          password: 'hashedPassword',
          token: 'token123',
        } as WorkerAuth);

      jest.spyOn(service, 'getWorkerWithAuthById').mockResolvedValueOnce({
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        role_id: 1,
        workerAuth: {
          email: 'john@example.com',
          password: 'hashedPassword',
          token: 'token123',
        },
      } as Worker);

      const result = await service.createWorker(createDto);

      expect(result).toBeDefined();
      expect(result.workerAuth).toHaveProperty('email', createDto.email);
      expect(createWorkerMock).toHaveBeenCalledWith({
        first_name: createDto.firstName,
        last_name: createDto.lastName,
        role_id: createDto.roleId,
      });
      expect(createWorkerAuthMock).toHaveBeenCalledWith({
        worker_id: result.id,
        email: createDto.email.toLowerCase(),
        password: expect.any(String),
      });
    });
  });

  describe('getWorkerWithAuthById', () => {
    it('should retrieve a worker with authentication by ID', async () => {
      const workerId = 1;
      jest.spyOn(service['workerRepository'], 'findOne').mockResolvedValueOnce({
        id: workerId,
        first_name: 'John',
        last_name: 'Doe',
        role_id: 1,
        workerAuth: {
          email: 'john@example.com',
          password: 'hashedPassword',
          token: 'token123',
        },
      } as Worker);

      const result = await service.getWorkerWithAuthById(workerId);

      expect(result).toBeDefined();
      expect(result.id).toEqual(workerId);
      expect(result.first_name).toEqual('John');
      expect(result.last_name).toEqual('Doe');
      expect(result.role_id).toEqual(1);
      expect(result.workerAuth).toEqual({
        email: 'john@example.com',
        password: 'hashedPassword',
        token: 'token123',
      });
    });
  });

  describe('getAll', () => {
    it('should retrieve all workers', async () => {
      const mockWorkers = [
        { id: 1, first_name: 'John', last_name: 'Doe', role_id: 1 },
        { id: 2, first_name: 'Jane', last_name: 'Doe', role_id: 2 },
      ] as Worker[];

      jest
        .spyOn(service['workerRepository'], 'findAll')
        .mockResolvedValueOnce(mockWorkers);

      const result = await service.getAll();

      expect(result).toEqual(mockWorkers);
    });
  });

  describe('update', () => {
    it('should update a worker and its authentication', async () => {
      const updateDto: UpdateWorkerDto = {
        id: 1,
        first_name: 'UpdatedJohn',
        last_name: 'UpdatedDoe',
        roleId: 2,
        email: 'updatedjohn@example.com',
        password: 'updatedPassword123',
      };

      jest
        .spyOn(service['workerRepository'], 'update')
        .mockResolvedValueOnce([1, [{ id: 1, ...updateDto }]] as any);

      jest.spyOn(workerAuthService, 'update').mockResolvedValueOnce([1] as any);

      await service.update(updateDto);
      expect(service['workerRepository'].update).toHaveBeenCalledWith(
        {
          first_name: updateDto.first_name,
          last_name: updateDto.last_name,
          role_id: updateDto.roleId,
        },
        {
          where: { id: updateDto.id, deleted_at: null },
          returning: true,
          transaction: mockTransaction,
        },
      );
      expect(service['workerAuthService'].update).toHaveBeenCalledWith(
        {
          worker_id: 1,
          email: updateDto.email,
          password: updateDto.password,
        },
        mockTransaction,
      );
    });
  });

  describe('smartDelete', () => {
    it('should soft delete a worker and its authentication', async () => {
      const deleteDto: DeleteWorkerDto = {
        id: 1,
      };

      jest
        .spyOn(service['workerRepository'], 'update')
        .mockResolvedValueOnce([1, [{ ...deleteDto }]] as any);

      jest
        .spyOn(workerAuthService, 'smartDelete')
        .mockResolvedValueOnce([1] as any);

      await service.smartDelete(deleteDto);
      expect(service['workerAuthService'].smartDelete).toHaveBeenCalledWith(
        {
          worker_id: 1,
        },
        mockTransaction,
      );
    });
  });
});
