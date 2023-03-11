import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private _srv: MediaService) {}

  @Post('new')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  public async UplodaFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    console.log(req.headers);
    console.log(req.body);

    if (!file) throw new BadRequestException();
    const response = await this._srv.WriteFile(file.buffer, file.originalname);
    return {
      message: response,
    };
  }

  @Get('')
  @UseGuards(AuthGuard)
  public async GetAllFiles() {
    return await this._srv.GetAllFiles();
  }

  @Get(':type')
  @UseGuards(AuthGuard)
  public async GetAllFilteredFiles(@Param('type') fileType: string) {
    return await this._srv.GetAllFilteredFiles(fileType);
  }

  @Delete(':name')
  @UseGuards(AuthGuard)
  public async Delete(@Param('name') fileName: string) {
    const response = await this._srv.Delete(fileName);
    if (response.message === 404) throw new NotFoundException();
    return {
      message: 'deleted !',
    };
  }
}
