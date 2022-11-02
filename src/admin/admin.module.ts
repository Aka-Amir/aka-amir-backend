import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from '../core/core.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminsSchema, collectionName } from './schemas/admins.schema';

@Module({
  imports: [
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
})
export class AdminModule {}
