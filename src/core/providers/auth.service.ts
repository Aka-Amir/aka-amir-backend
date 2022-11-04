import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService<T extends object> {
  constructor(private jwt: JwtService) {}

  public async GetToken(data: T): Promise<string> {
    const token = await this.jwt.signAsync(data, {
      algorithm: 'HS256',
      expiresIn: '10m',
    });

    return `Bearer ${token}`;
  }

  public async GetRefresh(data: T): Promise<string> {
    const token = await this.jwt.signAsync(data, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    return `Auth ${token}`;
  }

  public async Validate(tokenString: string): Promise<T> {
    const token = tokenString.split(' ')[1];
    const response = await this.jwt.verifyAsync<T>(token, {
      algorithms: ['HS256'],
    });
    return response;
  }
}
