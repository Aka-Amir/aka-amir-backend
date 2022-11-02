import { Module } from '@nestjs/common';
import { SiteDataService } from './site-data.service';
import { SiteDataController } from './site-data.controller';

@Module({
  providers: [SiteDataService],
  controllers: [SiteDataController]
})
export class SiteDataModule {}
