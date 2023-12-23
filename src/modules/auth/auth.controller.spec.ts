import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { Worker } from '../worker/worker.model';
import { AuthGuard } from '../auth/auth.guard';
import { CanActivate } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mock_authGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_authGuard)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call AuthService.login with the correct parameters', async () => {
      const loginDto: LoginDto = {
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
          password: 'hashedPassword',
          token: null,
          created_at: new Date(),
          deleted_at: null,
          worker_id: 1,
        },
      } as Worker;

      jest.spyOn(authService, 'login').mockResolvedValueOnce({
        worker,
        token: 'generatedToken',
      });

      const result = await authController.login(loginDto);

      expect(result).toBeDefined();
      expect(result).toEqual({
        worker,
        token: 'generatedToken',
      });

      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('logout', () => {
    it('should call AuthService.logout with the correct parameters', async () => {
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
          password: 'hashedPassword',
          token: 'token123',
          created_at: new Date(),
          deleted_at: null,
          worker_id: 1,
        },
      } as Worker;

      jest.spyOn(authService, 'logout').mockResolvedValueOnce(undefined);

      const result = await authController.logout(worker);

      expect(result).toBeUndefined();

      expect(authService.logout).toHaveBeenCalledWith({ workerId: worker.id });
    });
  });
});
