import { AuthService } from './providers/auth.service';
import { Module } from '@nestjs/common';
import { EncryptionService } from './providers/encryption.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secter_of_hitler',
    }),
  ],
  providers: [],
  exports: [EncryptionService, AuthService],
})
export class CoreModule {}
