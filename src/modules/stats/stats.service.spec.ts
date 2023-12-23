import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Stats } from './stats.model';
import { StatsService } from './stats.service';

describe('StatsService', () => {
  let statsService: StatsService;
  let statsModel: typeof Stats;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        {
          provide: getModelToken(Stats),
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    statsService = module.get<StatsService>(StatsService);
    statsModel = module.get<typeof Stats>(getModelToken(Stats));
  });

  describe('findAll', () => {
    it('should return total income without date filtering', async () => {
      jest
        .spyOn(statsModel, 'findAll')
        .mockReturnValueOnce({ totalIncome: 1000 } as any);

      const result = await statsService.findAll(null, null);

      expect(result).toEqual({ totalIncome: 1000 });
    });
  });
});
