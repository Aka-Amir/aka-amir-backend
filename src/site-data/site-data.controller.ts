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
import TileData from './schemas/tile.data';

@Controller('site-data')
export class SiteDataController {
  constructor(private service: SiteDataService) {}

  @Post('new')
  @UseGuards(AuthGuard<Admin>)
  public async Create(@Body() data: SiteData) {
    try {
      const response = await this.service.Create(data);
      return {
        message: 'created',
        id: response.id,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Put('update')
  @UseGuards(AuthGuard<Admin>)
  public async Update(
    @Body() data: { id: string; updatingData: SiteData & any },
  ) {
    const keys = Object.keys(data.updatingData);
    if (keys.includes('_id')) delete data.updatingData._id; // Not allowed !
    if (keys.includes('__v')) delete data.updatingData.__v; // Not allowed !
    const response = await this.service.Update(data.id, data.updatingData);
    if (!response) throw new NotFoundException();
    return {
      message: 'updated',
    };
  }

  @Put('update_tile/:id')
  @UseGuards(AuthGuard<Admin>)
  public async UpdateTile(
    @Param('id') id: string,
    @Body() data: { index: number; updatingData: TileData },
  ) {
    const response = await this.service.UpdateTileData(
      id,
      data.index,
      data.updatingData,
    );
    if (!response) throw new NotFoundException();
    return {
      message: 'updated',
    };
  }

  @Put('push_to_tiles')
  @UseGuards(AuthGuard<Admin>)
  public async PushToTiles(@Body() data: { id: string; tileData: TileData }) {
    const response = await this.service.PushToTile(data.id, data.tileData);
    if (!response) throw new NotFoundException();
    return {
      message: 'pushed',
      payload: response,
    };
  }

  @Delete('delete_tile/:id/:tileIndex')
  @UseGuards(AuthGuard<Admin>)
  public async DeleteTile(
    @Param('id') id: string,
    @Param('tileIndex') tileIndex: number,
  ) {
    const response = await this.service.DeleteTile(id, tileIndex);
    if (!response) throw new NotFoundException('Does not exists !');
    return {
      message: 'updated',
      payload: response,
    };
  }

  @Get(':pageId')
  public async GetByPageId(@Param('pageId') pageId: string) {
    return await this.service.GetByPageId(pageId);
  }

  @Get('')
  @UseGuards(AuthGuard<Admin>)
  public async GetAll() {
    return await this.service.GetGroupByPageIds();
  }

  @Delete('delete_page/:id')
  @UseGuards(AuthGuard<Admin>)
  public async DeletePage(@Param('id') id: string) {
    return await this.service.DeleteByPageId(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard<Admin>)
  public async DeleteOne(@Param('id') id: string) {
    return await this.service.Delete(id);
  }
}
