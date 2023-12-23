// feedback.service.spec.ts

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackService } from './feedback.service';
import { Model, Query } from 'mongoose';
import { Feedback, FeedbackDocument } from './schemas/feedback.schema';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

describe('FeedbackService', () => {
  let feedback: CreateFeedbackDto;
  let service: FeedbackService;
  let model: Model<FeedbackDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        {
          provide: getModelToken(Feedback.name),
          useValue: {
            create: jest.fn(() => feedback),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
    model = module.get<Model<FeedbackDocument>>(getModelToken(Feedback.name));
    feedback = new CreateFeedbackDto();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#create', () => {
    it('should create a feedback', async () => {
      expect(await service.create(feedback)).toEqual(feedback);
      expect(model.create).toHaveBeenCalledWith(feedback);
    });
  });

  describe('#findAll', () => {
    it('should return all feedbacks', async () => {
      jest
        .spyOn(model, 'find')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue([]),
        } as unknown as Query<Feedback[], any>);
      expect(await service.findAll()).toEqual([]);
    });
  });

  describe('#findOne', () => {
    it('should return feedback by id', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(feedback),
        } as unknown as Query<Feedback, any>);
      expect(await service.findOne('id')).toEqual(feedback);
      expect(model.findOne).toHaveBeenCalledWith({ _id: 'id' });
    });
  });

  describe('#delete', () => {
    it('should remove feedback by id', async () => {
      jest
        .spyOn(model, 'findByIdAndDelete')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValue(feedback),
        } as unknown as Query<Feedback, any>);
      expect(await service.delete(feedback._id)).toEqual(feedback);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith({
        _id: feedback._id,
      });
    });
  });
});
