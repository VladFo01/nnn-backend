// feedback.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { CanActivate } from '@nestjs/common';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const mock_authGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            create: jest
              .fn<Promise<CreateFeedbackDto>, CreateFeedbackDto[]>()
              .mockImplementation((feedback) =>
                Promise.resolve({ _id: 'a uuid', ...feedback }),
              ),
            findOne: jest
              .fn<Promise<CreateFeedbackDto>, string[]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  phoneNumber: '+12345',
                  text: 'fsgsgsfg',
                  rating: 5,
                  _id: id,
                }),
              ),
            findAll: jest
              .fn<Promise<CreateFeedbackDto[]>, unknown[]>()
              .mockImplementation(() =>
                Promise.resolve([
                  {
                    phoneNumber: '+12345',
                    text: 'fsgsgsfg',
                    rating: 5,
                  },
                  {
                    phoneNumber: '+23456',
                    text: 'fsgsgsfdsdfdsfsdfg',
                    rating: 4,
                  },
                  {
                    phoneNumber: '+34567',
                    text: 'fsgerwrerwrewsgsfg',
                    rating: 3,
                  },
                ]),
              ),
            delete: jest
              .fn<Promise<CreateFeedbackDto>, string[]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  _id: id,
                  phoneNumber: '+12345',
                  text: 'fsgsgsfg',
                  rating: 5,
                }),
              ),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mock_authGuard)
      .overrideGuard(RolesGuard)
      .useValue(mock_authGuard)
      .compile();

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a feedback', async () => {
      const createFeedbackDto: CreateFeedbackDto = {
        phoneNumber: '+123445',
        text: 'Blablabla',
        rating: 5,
      };
      expect(controller.create(createFeedbackDto)).resolves.toEqual({
        _id: 'a uuid',
        ...createFeedbackDto,
      });
      expect(service.create).toHaveBeenCalledWith(createFeedbackDto);
    });
  });

  describe('findAll', () => {
    it('should find all feedbacks', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          phoneNumber: '+12345',
          text: 'fsgsgsfg',
          rating: 5,
        },
        {
          phoneNumber: '+23456',
          text: 'fsgsgsfdsdfdsfsdfg',
          rating: 4,
        },
        {
          phoneNumber: '+34567',
          text: 'fsgerwrerwrewsgsfg',
          rating: 3,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should find a feedback', async () => {
      const someid = 'some id';
      expect(controller.findOne(someid)).resolves.toEqual({
        _id: someid,
        phoneNumber: '+12345',
        text: 'fsgsgsfg',
        rating: 5,
      });
      expect(service.findOne).toHaveBeenCalledWith(someid);
    });
  });

  describe('delete', () => {
    it('should delete a feedback', async () => {
      const someid = 'some id';
      expect(controller.delete(someid)).resolves.toEqual({
        _id: someid,
        phoneNumber: '+12345',
        text: 'fsgsgsfg',
        rating: 5,
      });
      expect(service.delete).toHaveBeenCalledWith(someid);
    });
  });
});
