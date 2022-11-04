import { AuthService } from './providers/auth.service';
import { Module } from '@nestjs/common';
import { EncryptionService } from './providers/encryption.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secter_of_hitler',
    }),
  ],
  providers: [EncryptionService, AuthService, AuthGuard],
  exports: [EncryptionService, AuthService, AuthGuard],
})
export class CoreModule {}
