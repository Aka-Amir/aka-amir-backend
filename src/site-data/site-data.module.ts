import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './../core/core.module';
import { SiteDataService } from './site-data.service';
import { SiteDataController } from './site-data.controller';
import { collectionName, SiteDataSchema } from './schemas/site-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: collectionName,
        schema: SiteDataSchema,
      },
    ]),
    CoreModule,
  ],
  providers: [SiteDataService],
  controllers: [SiteDataController],
})
export class SiteDataModule {}
