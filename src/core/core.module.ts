import { Module } from '@nestjs/common';
import { EncryptionService } from './providers/encryption.service';

@Module({
  providers: [EncryptionService],
  exports: [EncryptionService],
})
export class CoreModule {}
