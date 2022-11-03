import { Admin } from './../core/types/Admin.type';
import { AuthService } from './../core/providers/auth.service';
import * as dto from './DTO';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { EncryptionService } from '../core/providers/encryption.service';

@Controller('admin')
export class AdminController {
  constructor(
    private service: AdminService,
    private encryption: EncryptionService,
    private auth: AuthService<Admin>,
  ) {}

  @Post('register')
  public async CreateAdmin(@Body() body: dto.CreateAdminDto) {
    const hashedPassowrd = await this.encryption.PasswordEncryption(
      body.password,
    );
    const id = await this.service.Create(body.username, hashedPassowrd);
    const payload: Admin = {
      id,
      username: body.username,
    };
    const token = await this.auth.GetToken(payload);
    const refresh = await this.auth.GetRefresh(payload);

    return {
      message: 'created',
      payload: {
        token,
        refresh,
        id,
      },
    };
  }

  @Post('login')
  public async ValidateAdmin(@Body() body: dto.VlidateDto) {
    const user = await this.service.FindByUsername(body.username);
    const isSame = await this.encryption.Compare(body.password, user.password);

    if (!isSame) {
      throw new ForbiddenException();
    }

    const payload: Admin = {
      id: user._id?.toString(),
      username: user.username,
    };

    const token = await this.auth.GetToken(payload);
    const refresh = await this.auth.GetRefresh(payload);

    return {
      message: 'LoggedIn',
      payload: {
        token,
        refresh,
      },
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
