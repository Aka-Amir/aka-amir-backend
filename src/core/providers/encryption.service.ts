import { Injectable } from '@nestjs/common';
import * as crypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly _salt = '8PXbbdKa75ut5vPe';
  public async PasswordEncryption(password: string) {
    return await crypt.hash(password, 16);
  }

  public async Compare(hashedData: string, expected: string) {
    return await crypt.compare(hashedData, expected);
  }
}
