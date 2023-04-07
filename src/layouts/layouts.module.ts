import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LayoutSchema, collectionName } from './entities/layout.entity';
import { LayoutsController } from './layouts.controller';
import { LayoutsService } from './layouts.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: collectionName,
        schema: LayoutSchema,
      },
    ]),
    CoreModule,
  ],
  controllers: [LayoutsController],
  providers: [LayoutsService],
})
export class LayoutsModule {}
