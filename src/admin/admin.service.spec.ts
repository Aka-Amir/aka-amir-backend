import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { collectionName, AdminsSchema } from './schemas/admins.schema';

describe('AdminService', () => {
  let service: AdminService;
  const username = 'amir';
  let id = '';

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
      ],
      providers: [AdminService],
    }).compile();

    service = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create an admin', async () => {
    await expect(service.Create(username, '1234')).resolves.toBeTruthy();
  });

  it('Should not create duplicated admin', async () => {
    await expect(service.Create(username, '1234')).rejects.toBeTruthy();
  });

  it('Should find all', async () => {
    await expect(service.FindAll()).resolves.toBeTruthy();
    const response = await service.FindAll();
    expect(response.length).toBeGreaterThanOrEqual(1);
  });

  it('Should find by username', async () => {
    const response = await service.FindByUsername(username);
    id = response._id;
    expect(response.username).toBe(username);
  });

  it('Should find by id', async () => {
    await expect(service.FindById(id)).resolves.toMatchObject({
      username,
      _id: id,
    });
  });

  it('Should Update User', async () => {
    await expect(
      service.UpdateUser(id, { password: '12345' }),
    ).resolves.toMatchObject({
      username,
    });
  });

  it('Should Delete User', async () => {
    await expect(service.Delete(id)).resolves.toMatchObject({
      password: '12345',
      username,
    });
    await expect(service.FindAll()).resolves.toStrictEqual([]);
  });
});
