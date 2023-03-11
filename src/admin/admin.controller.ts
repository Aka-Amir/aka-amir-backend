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
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { EncryptionService } from '../core/providers/encryption.service';
import { AuthGuard } from '../core/guards/auth.guard';
import { TokenData } from 'src/core/decorators/token-data-param.decorator';

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
        avatarId: 0,
        id,
      },
    };
  }

  @Post('login')
  public async ValidateAdmin(@Body() body: dto.VlidateDto) {
    const user = await this.service.FindByUsername(body.username);
    if (!user) throw new ForbiddenException();
    const isSame = await this.encryption.Compare(body.password, user.password);

    if (!isSame) {
      throw new ForbiddenException('NS');
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
        avatarId: user.avatarId,
        id: payload.id,
      },
    };
  }

  @Get('new_token')
  @UseGuards(AuthGuard<Admin>)
  public async RefreshToken(@TokenData() admin: Admin) {
    const response = await this.service.FindById(admin.id);
    if (!response) throw new ForbiddenException();
    const token = await this.auth.GetToken(admin);
    return {
      message: 'new token',
      payload: token,
    };
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard<Admin>)
  public async DeleteUser(@Param('id') id: string) {
    const response = await this.service.Delete(id);
    return {
      message: 'deleted',
      payload: response,
    };
  }

  @Put('update')
  @UseGuards(AuthGuard<Admin>)
  public async UpdateUser(
    @Body() body: dto.UpdateAdminDto,
    @TokenData() admin: Admin,
  ) {
    try {
      if (admin?.id !== body.id) throw new ForbiddenException();
      if (body.updateFields.password) {
        body.updateFields.password = await this.encryption.PasswordEncryption(
          body.updateFields.password,
        );
      }
      const response = await this.service.UpdateUser(
        body.id,
        body.updateFields,
      );
      return {
        payload: response,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @Get('id/:id')
  @UseGuards(AuthGuard<Admin>)
  public async FindAdminById(@Param('id') id: string) {
    const response = await this.service.FindById(id);
    return {
      payload: response,
    };
  }

  @Get('username/:username')
  @UseGuards(AuthGuard<Admin>)
  public async FindByUsername(@Param('username') username: string) {
    const response = await this.service.FindByUsername(username);
    return {
      payload: response,
    };
  }

  @Get('')
  @UseGuards(AuthGuard<Admin>)
  public async FindAll() {
    const response = await this.service.FindAll();
    return {
      payload: response,
    };
  }
}
