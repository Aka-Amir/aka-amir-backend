import { Test, TestingModule } from '@nestjs/testing';
import { SiteDataService } from './site-data.service';

describe('SiteDataService', () => {
  let service: SiteDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteDataService],
    }).compile();

    service = module.get<SiteDataService>(SiteDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
