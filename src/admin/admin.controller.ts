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
import { EncryptionService } from '../core/providers/encryption.service';

@Controller('admin')
export class AdminController {
  constructor(
    private service: AdminService,
    private encryption: EncryptionService,
  ) {}

  @Post('create')
  public async CreateAdmin(@Body() body: dto.CreateAdminDto) {
    const hashedPassowrd = await this.encryption.PasswordEncryption(
      body.password,
    );
    const id = await this.service.Create(body.username, hashedPassowrd);
    return {
      message: 'created',
      payload: id,
    };
  }

  @Post('validate')
  public async ValidateAdmin(@Body() body: dto.VlidateDto) {
    const user = await this.service.FindByUsername(body.username);
    const hashedPassowrd = await this.encryption.Compare(
      body.password,
      user.password,
    );

    // const id = await this.service.Create(body.username, hashedPassowrd);
    return {
      message: 'created',
      payload: hashedPassowrd,
    };
  }

  @Delete('remove/:id')
  public async DeleteUser(@Param('id') id: string) {
    const response = await this.service.Delete(id);
    return {
      message: 'deleted',
      payload: response,
    };
  }

  @Put('update')
  public async UpdateUser(@Body() body: dto.UpdateAdminDto) {
    const response = await this.service.UpdateUser(body.id, body.updateFields);
    return {
      payload: response,
    };
  }

  @Get('id/:id')
  public async FindAdminById(@Param('id') id: string) {
    const response = await this.service.FindById(id);
    return {
      payload: response,
    };
  }

  @Get('username/:username')
  public async FindByUsername(@Param('username') username: string) {
    const response = await this.service.FindByUsername(username);
    return {
      payload: response,
    };
  }

  @Get('')
  public async FindAll() {
    const response = await this.service.FindAll();
    return {
      payload: response,
    };
  }
}
