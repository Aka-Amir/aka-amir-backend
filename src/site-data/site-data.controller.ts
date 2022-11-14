import { Admin } from './../core/types/Admin.type';
import { AuthGuard } from './../core/guards/auth.guard';
import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { SiteDataService } from './site-data.service';
import { SiteData } from './schemas/site-data.schema';

@Controller('site-data')
export class SiteDataController {
  constructor(private service: SiteDataService) {}

  @Post('new')
  @UseGuards(AuthGuard<Admin>)
  public async Create(@Body() data: SiteData) {
    const response = await this.service.Create(data);
    return {
      message: 'created',
      id: response.id,
    };
  }

  @Get(':pageId')
  public async GetByPageId(@Param('pageId') pageId: string) {
    return await this.service.GetByPageId(pageId);
  }
}
