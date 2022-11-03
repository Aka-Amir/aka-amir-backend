import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { collectionName, AdminsSchema } from './schemas/admins.schema';

import { AdminController } from './admin.controller';
import { CoreModule } from '../core/core.module';

describe('AdminController', () => {
  let controller: AdminController;
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost/test_aka_amir'),
        MongooseModule.forFeature([
          {
            name: collectionName,
            schema: AdminsSchema,
          },
        ]),
        CoreModule,
      ],
      controllers: [AdminController],
      providers: [AdminService],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('Should create admin', async () => {
    await expect(
      controller.CreateAdmin({
        password: '12345',
        username: 'amir2',
      }),
    ).resolves.toMatchObject({
      message: 'created',
    });
  });

  it('Should validate admin', async () => {
    await expect(
      controller.ValidateAdmin({
        password: '12345',
        username: 'amir2',
      }),
    ).resolves.toMatchObject({
      message: 'created',
      payload: true,
    });
  });
});
