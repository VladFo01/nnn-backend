import { Test, TestingModule } from '@nestjs/testing';
import { WorkerController } from './worker.controller';
import { WorkerService } from './worker.service';
import { CreateWorkerDto, UpdateWorkerDto } from './dto/worker.dto';
import { Worker } from './worker.model';
import { NotFoundException } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CanActivate } from '@nestjs/common';

describe('WorkerController', () => {
  let controller: WorkerController;
  let workerService: WorkerService;

  beforeEach(async () => {
    const mock_authGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerController],
      providers: [
        // WorkerService,
        {
          provide: WorkerService,
          useValue: {
            createWorker: jest.fn(),
            getAll: jest.fn(),
            getWorkerWithAuthById: jest.fn(),
            getWorkerWithAuthWhere: jest.fn(),
            update: jest.fn(),
            smartDelete: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_authGuard)
      .overrideGuard(RolesGuard)
      .useValue(mock_authGuard)
      .compile();

    controller = module.get<WorkerController>(WorkerController);
    workerService = module.get<WorkerService>(WorkerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a worker', async () => {
      const createDto: CreateWorkerDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        roleId: 1,
      };

      jest.spyOn(workerService, 'createWorker').mockResolvedValueOnce({
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

      const result = await controller.create(createDto);

      expect(result).toBeDefined();
      expect(result.workerAuth).toHaveProperty('email', createDto.email);
      expect(workerService.createWorker).toHaveBeenCalledWith(createDto);
    });
  });

  describe('getAll', () => {
    it('should get all workers', async () => {
      const workers = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          role_id: 1,
          workerAuth: {
            email: 'john@example.com',
            password: 'hashedPassword',
            token: 'token123',
          },
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Doe',
          role_id: 2,
          workerAuth: {
            email: 'jane@example.com',
            password: 'hashedPassword',
            token: 'token123',
          },
        },
      ] as Worker[];

      jest.spyOn(workerService, 'getAll').mockResolvedValueOnce(workers);

      const result = await controller.getAll();

      expect(result).toBeDefined();
      expect(result).toEqual(workers);
      expect(workerService.getAll).toHaveBeenCalled();
    });
  });

  describe('getOne', () => {
    it('should get a worker by ID', async () => {
      const worker = {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        workerAuth: {
          email: 'john@example.com',
          password: 'hashedPassword',
          token: 'token123',
        },
        role_id: 1,
      } as Worker;

      jest
        .spyOn(workerService, 'getWorkerWithAuthById')
        .mockResolvedValueOnce(worker);

      const result = await controller.getOne(1);

      expect(result).toBeDefined();
      expect(result).toEqual(worker);
      expect(workerService.getWorkerWithAuthById).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException for non-existing worker', async () => {
      jest
        .spyOn(workerService, 'getWorkerWithAuthById')
        .mockResolvedValueOnce(null);

      await expect(controller.getOne(999)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a worker', async () => {
      const updateDto: UpdateWorkerDto = {
        id: 1,
        first_name: 'UpdatedJohn',
        last_name: 'UpdatedDoe',
        email: 'updated.john.doe@example.com',
        password: 'updatedPassword123',
        roleId: 2,
      };

      jest.spyOn(workerService, 'update').mockResolvedValueOnce(undefined);

      const result = await controller.update(updateDto);

      expect(result).toBeUndefined();
      expect(workerService.update).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('delete', () => {
    it('should delete a worker', async () => {
      jest.spyOn(workerService, 'smartDelete').mockResolvedValueOnce(undefined);

      const result = await controller.delete(1);

      expect(result).toBeUndefined();
      expect(workerService.smartDelete).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
