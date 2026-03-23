import { Test, TestingModule } from '@nestjs/testing';
import { BloodRequestsController } from './blood-requests.controller';

describe('BloodRequestsController', () => {
  let controller: BloodRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BloodRequestsController],
    }).compile();

    controller = module.get<BloodRequestsController>(BloodRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
