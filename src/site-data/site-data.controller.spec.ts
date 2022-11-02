import { Test, TestingModule } from '@nestjs/testing';
import { SiteDataController } from './site-data.controller';

describe('SiteDataController', () => {
  let controller: SiteDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteDataController],
    }).compile();

    controller = module.get<SiteDataController>(SiteDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
