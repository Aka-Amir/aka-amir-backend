import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { map } from 'rxjs';
import { AuthGuard } from '../core/guards/auth.guard';
import { Admin } from '../core/types/Admin.type';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { UpdateLayoutDto } from './dto/update-layout.dto';
import { Layout } from './entities/layout.entity';
import { LayoutsService } from './layouts.service';

@Controller('layouts')
export class LayoutsController {
  constructor(private readonly layoutsService: LayoutsService) {}

  @Post()
  @UseGuards(AuthGuard<Admin>)
  create(@Body() createLayoutDto: CreateLayoutDto) {
    return this.layoutsService.create(createLayoutDto).pipe(
      map((item) => ({
        message: 'created',
        _id: item._id,
        data: item.data,
        layoutId: item.layoutId,
        metaData: item.metaData,
        creationDate: item.creationDate,
        lastModifiedDate: item.lastModifiedDate,
        displayName: item.displayName,
      })),
    );
  }

  @Get()
  findAll() {
    return this.layoutsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.layoutsService.findOne(id).pipe(
      map((item) => {
        if (!item) throw new NotFoundException();
        return item;
      }),
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard<Admin>)
  update(@Param('id') id: string, @Body() updateLayoutDto: UpdateLayoutDto) {
    return this.layoutsService.update(id, updateLayoutDto).pipe(
      map((item) => {
        if (!item.matchedCount) throw new NotFoundException();
        return {
          message: 'updated',
        };
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard<Admin>)
  remove(@Param('id') id: string) {
    return this.layoutsService.remove(id).pipe(
      map((item): Layout => {
        if (!item) throw new NotFoundException();
        return {
          data: item.data,
          layoutId: item.layoutId,
          metaData: item.metaData,
          creationDate: item.creationDate,
          lastModifiedDate: item.lastModifiedDate,
          displayName: item.displayName,
        };
      }),
    );
  }
}
