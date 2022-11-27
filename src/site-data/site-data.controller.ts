import { Admin } from './../core/types/Admin.type';
import { AuthGuard } from './../core/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  NotFoundException,
  Delete,
} from '@nestjs/common';
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

  @Put('update')
  @UseGuards(AuthGuard<Admin>)
  public async Update(@Body() data: { id: string; updatingData: SiteData }) {
    const response = await this.service.Update(data.id, data.updatingData);
    if (!response) throw new NotFoundException();
    return {
      message: 'updated',
    };
  }

  @Get(':pageId')
  public async GetByPageId(@Param('pageId') pageId: string) {
    return await this.service.GetByPageId(pageId);
  }

  @Get('')
  @UseGuards(AuthGuard<Admin>)
  public async GetAll() {
    return await this.service.GetAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard<Admin>)
  public async DeleteOne(@Param('id') id: string) {
    return await this.service.Delete(id);
  }
}
