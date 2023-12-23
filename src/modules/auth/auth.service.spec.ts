import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { WorkerService } from '../worker/worker.service';
import { WorkerAuthService } from '../workerAuth/workerAuth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '@nestjs/common';
import { Worker } from '../worker/worker.model';

describe('AuthService', () => {
  let authService: AuthService;
  let workerService: WorkerService;
  let workerAuthService: WorkerAuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: WorkerService,
          useValue: {
            getWorkerWithAuthWhere: jest.fn(),
            getWorkerWithAuthById: jest.fn(),
          },
        },
        {
          provide: WorkerAuthService,
          useValue: {
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    workerService = module.get<WorkerService>(WorkerService);
    workerAuthService = module.get<WorkerAuthService>(WorkerAuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should login a worker and return updated worker and token', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const worker: Worker = {
        id: 1,
        first_name: 'Test',
        last_name: 'User',
        role_id: 2,
        created_at: new Date(),
        deleted_at: null,
        workerAuth: {
          id: 1,
          email: 'test@example.com',
          password: await bcrypt.hash('password123', 5),
          token: null,
          created_at: new Date(),
          deleted_at: null,
          worker_id: 1,
        },
      } as Worker;

      jest
        .spyOn(workerService, 'getWorkerWithAuthWhere')
        .mockResolvedValueOnce(worker);
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
      jest.spyOn(jwtService, 'sign').mockReturnValueOnce('generatedToken');
      jest.spyOn(workerAuthService, 'update').mockResolvedValueOnce(undefined);
      jest
        .spyOn(workerService, 'getWorkerWithAuthById')
        .mockResolvedValueOnce(worker);

      const result = await authService.login(dto);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('worker', worker);
      expect(result).toHaveProperty('token', 'generatedToken');

      expect(workerService.getWorkerWithAuthWhere).toHaveBeenCalledWith(
        { deleted_at: null },
        { email: 'test@example.com', deleted_at: null },
      );
      expect(bcrypt.compare).toHaveBeenCalledWith(
        'password123',
        worker.workerAuth.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: worker.id,
        email: dto.email,
        role: worker.role_id,
      });
      expect(workerAuthService.update).toHaveBeenCalledWith({
        worker_id: worker.id,
        token: 'generatedToken',
      });
      expect(workerService.getWorkerWithAuthById).toHaveBeenCalledWith(
        worker.id,
      );
    });

    it('should throw BadRequestException for invalid credentials', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest
        .spyOn(workerService, 'getWorkerWithAuthWhere')
        .mockResolvedValueOnce(null);

      await expect(authService.login(dto)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('logout', () => {
    it('should logout a worker', async () => {
      const dto = { workerId: 1 };

      jest.spyOn(workerAuthService, 'update').mockResolvedValueOnce(undefined);

      await authService.logout(dto);

      expect(workerAuthService.update).toHaveBeenCalledWith({
        worker_id: dto.workerId,
        token: null,
      });
    });
  });
});
