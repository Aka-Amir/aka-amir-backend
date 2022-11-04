import { Admin } from './../core/types/Admin.type';
import { AuthGuard } from './../core/guards/auth.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { SiteDataService } from './site-data.service';

@Controller('site-data')
export class SiteDataController {
  constructor(private service: SiteDataService) {}

  @Post('create')
  @UseGuards(AuthGuard<Admin>)
  public async Create() {
    return {
      message: 'string',
    };
  }
}
