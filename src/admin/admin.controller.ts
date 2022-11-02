import * as dto from './DTO';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private service: AdminService) {}

  @Post('create')
  private async CreateAdmin(@Body() body: dto.CreateAdminDto) {
    const id = await this.service.Create(body.username, body.password);
    return {
      message: 'created',
      payload: id,
    };
  }

  @Delete('remove/:id')
  private async DeleteUser(@Param('id') id: string) {
    const response = await this.service.Delete(id);
    return {
      message: 'deleted',
      payload: response,
    };
  }

  @Put('update')
  private async UpdateUser(@Body() body: dto.UpdateAdminDto) {
    const response = await this.service.UpdateUser(body.id, body.updateFields);
    return {
      payload: response,
    };
  }

  @Get('id/:id')
  private async FindAdminById(@Param('id') id: string) {
    const response = await this.service.FindById(id);
    return {
      payload: response,
    };
  }

  @Get('username/:username')
  private async FindByUsername(@Param('username') username: string) {
    const response = await this.service.FindByUsername(username);
    return {
      payload: response,
    };
  }

  @Get('')
  private async FindAll() {
    const response = await this.service.FindAll();
    return {
      payload: response,
    };
  }
}
