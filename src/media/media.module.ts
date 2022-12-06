import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [CoreModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
