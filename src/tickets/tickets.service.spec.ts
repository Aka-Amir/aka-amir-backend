import { collectionName, TicketsSchema } from './schemas/tickets.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/aka_amir'),
        MongooseModule.forFeature([
          {
            name: collectionName,
            schema: TicketsSchema,
          },
        ]),
      ],
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should be id', async () => {
    const id = await service.Create('test', 'test2');
    expect(id).toBeTruthy();
  });
});
