import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CoreModule } from '../core/core.module';
import { collectionName, SiteDataSchema } from './schemas/site-data.schema';
import { SiteDataService } from './site-data.service';

describe('SiteDataService', () => {
  let service: SiteDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test_aka_amir'),
        MongooseModule.forFeature([
          {
            name: collectionName,
            schema: SiteDataSchema,
          },
        ]),
        CoreModule,
      ],
      providers: [SiteDataService],
    }).compile();

    service = module.get<SiteDataService>(SiteDataService);
  });

  it('should be defined', async () => {
    const response = await service.Create();
    expect(response).toBeTruthy();
  });
});
